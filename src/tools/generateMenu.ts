
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type MenuJson = {
  name: string;
  tags: string[];
  items: Array<{
    id: string;
    category: string;
    name: string;
    allergens: {
      dairy: boolean;
      wheat: boolean;
      peanuts: boolean;
      soy: boolean;
      gluten: boolean;
      sulphites: boolean;
    };
    notes: string;
  }>;
};

const PROMPT = `You are generating structured data for a restaurant allergen app.

Return ONLY valid JSON matching this schema:
{
  "name": string,
  "tags": string[],
  "items": [
    {
      "id": string,
      "category": string,
      "name": string,
      "allergens": {
        "dairy": boolean,
        "wheat": boolean,
        "peanuts": boolean,
        "soy": boolean,
        "gluten": boolean,
        "sulphites": boolean
      },
      "notes": string
    }
  ]
}

Rules:
- Generate IDs like: restaurant-category-number
- Group into categories if visible
- If allergens are not explicitly listed, set them to false
- If uncertain, add explanation in notes
- Do NOT guess allergens
- Do NOT include prices in output
- Keep notes concise
- Return JSON only, no markdown fences`;

async function main() {
  const source = process.argv[2];
  const outputDir = process.argv[3] || path.join(process.cwd(), "_data", "restaurants");

  if (!source) {
    console.error("Usage: npx tsx tools/generateMenu.ts <image-path|image-url|pdf-url|webpage-url> [outputDir]");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in environment variables.");
    process.exit(1);
  }

  const data = await extractMenu(source);
  const baseName = slugify(data.name || deriveBaseName(source));
  const tsx = generateTSX(data, baseName);

  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${baseName}.tsx`);
  fs.writeFileSync(outputPath, tsx, "utf8");

  console.log(`✅ TSX file created: ${outputPath}`);
}

async function extractMenu(source: string): Promise<MenuJson> {
  if (isHttpUrl(source)) {
    if (isImageUrl(source)) {
      return parseJsonResponse(
        await analyzeWithModel([
          { type: "input_text", text: `${PROMPT}

Source type: direct image URL.` },
          { type: "input_image", image_url: source },
        ])
      );
    }

    if (isPdfUrl(source)) {
      return parseJsonResponse(
        await analyzeWithModel([
          { type: "input_text", text: `${PROMPT}

Source type: direct PDF URL.` },
          { type: "input_file", file_url: source },
        ])
      );
    }

    const page = await fetchWebPage(source);
    const prompt = `${PROMPT}

Source type: webpage URL.
Source URL: ${source}

Page title:
${page.title}

Visible page text:
${page.text}

Likely menu-related links from page:
${page.links.length ? page.links.join("\n") : "None found"}`;

    return parseJsonResponse(
      await analyzeWithModel([
        { type: "input_text", text: prompt },
      ])
    );
  }

  if (!fs.existsSync(source)) {
    throw new Error(`Input not found: ${source}`);
  }

  const ext = path.extname(source).toLowerCase();
  if (ext === ".pdf") {
    const mimeType = "application/pdf";
    const base64 = fs.readFileSync(source, "base64");
    return parseJsonResponse(
      await analyzeWithModel([
        { type: "input_text", text: `${PROMPT}

Source type: local PDF file.` },
        { type: "input_file", filename: path.basename(source), file_data: `data:${mimeType};base64,${base64}` },
      ])
    );
  }

  const mimeType = getImageMimeType(ext);
  const base64 = fs.readFileSync(source, "base64");
  return parseJsonResponse(
    await analyzeWithModel([
      { type: "input_text", text: `${PROMPT}

Source type: local image file.` },
      { type: "input_image", image_url: `data:${mimeType};base64,${base64}` },
    ])
  );
}

async function analyzeWithModel(content: any[]) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content,
      },
    ],
  });

  return response.output_text || "";
}

function parseJsonResponse(raw: string): MenuJson {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const data = JSON.parse(cleaned);
    validateMenuJson(data);
    return data;
  } catch (error) {
    console.error("Raw model output:", raw);
    throw new Error("Model output was not valid JSON.");
  }
}

function validateMenuJson(data: any): asserts data is MenuJson {
  if (!data || typeof data !== "object") throw new Error("Invalid JSON object.");
  if (typeof data.name !== "string") throw new Error("Missing restaurant name.");
  if (!Array.isArray(data.tags)) data.tags = [];
  if (!Array.isArray(data.items)) throw new Error("Missing items array.");

  for (const item of data.items) {
    if (!item.allergens) item.allergens = {};
    item.allergens = {
      dairy: Boolean(item.allergens.dairy),
      wheat: Boolean(item.allergens.wheat),
      peanuts: Boolean(item.allergens.peanuts),
      soy: Boolean(item.allergens.soy),
      gluten: Boolean(item.allergens.gluten),
      sulphites: Boolean(item.allergens.sulphites),
    };
    item.notes = typeof item.notes === "string" ? item.notes : "";
  }
}

function generateTSX(data: MenuJson, constName: string) {
  const safeName = escapeTemplateString(data.name);
  const safeTags = JSON.stringify(data.tags ?? [], null, 2);
  const safeItems = JSON.stringify(data.items ?? [], null, 2);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `import { Restaurant } from "../types";

export const ${constName}: Restaurant = {
  name: ${JSON.stringify(safeName)},
  tags: ${indentMultiline(safeTags, 2)},
  lastUpdated: ${JSON.stringify(today)},
  items: ${indentMultiline(safeItems, 2)}
};
`;
}

async function fetchWebPage(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 MenuGenerator/1.0",
      "Accept": "text/html,application/xhtml+xml",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch webpage: ${res.status} ${res.statusText}`);

  const html = await res.text();
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const text = htmlToText(html).slice(0, 30000);
  const links = extractLikelyMenuLinks(html, url).slice(0, 20);

  return { title, text, links };
}

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLikelyMenuLinks(html: string, baseUrl: string) {
  const matches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  const keywords = ["menu", "food", "drink", "dining", "allergen", "nutrition", ".pdf"];
  const base = new URL(baseUrl);

  return matches
    .map((m) => {
      const href = m[1].trim();
      const text = htmlToText(m[2]);
      let absolute = href;
      try {
        absolute = new URL(href, base).toString();
      } catch {}
      return { url: absolute, text };
    })
    .filter((x) => {
      const hay = `${x.url} ${x.text}`.toLowerCase();
      return keywords.some((k) => hay.includes(k));
    })
    .map((x) => `${x.text || "Link"}: ${x.url}`)
    .filter((x, i, arr) => arr.indexOf(x) === i);
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function isImageUrl(value: string) {
  return /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(value);
}

function isPdfUrl(value: string) {
  return /\.pdf(\?.*)?$/i.test(value);
}

function getImageMimeType(ext: string) {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      throw new Error(`Unsupported image extension: ${ext}`);
  }
}

function deriveBaseName(source: string) {
  if (isHttpUrl(source)) {
    try {
      const u = new URL(source);
      const tail = u.pathname.split("/").filter(Boolean).pop() || u.hostname;
      return tail.replace(/\.[^.]+$/, "") || u.hostname;
    } catch {
      return "restaurant-menu";
    }
  }
  return path.basename(source).replace(/\.[^.]+$/, "");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "restaurant-menu";
}

function indentMultiline(str: string, spaces: number) {
  const indent = " ".repeat(spaces);
  return str
    .split("
")
    .map((line, index) => (index === 0 ? line : indent + line))
    .join("
");
}

function escapeTemplateString(value: string) {
  return value.replace(/\/g, "\\").replace(/`/g, "\`");
}

main().catch((err) => {
  console.error(`❌ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});