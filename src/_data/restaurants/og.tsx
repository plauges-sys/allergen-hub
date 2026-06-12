import { Restaurant } from "../types";

// Add "export" right here:
export const og: Restaurant = {
  name: "Olive Garden",
  tags: ["Sit Down", "Italian"],
  lastUpdated: "January 2026",
  items: [
    { id: "og1", category: "Entrees", name: "Gluten-Free Rotini with Marinara", allergens: { dairy: false, wheat: false, peanuts: false, soy: false }, notes: "Prepared separately." }
  ]
};