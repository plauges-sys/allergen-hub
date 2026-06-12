import { Restaurant } from "../types";

// Add "export" right here:
export const starbucks: Restaurant = {
  name: "Starbucks",
  tags: ["Cafe"],
  lastUpdated: "April 2026",
  items: [
    { id: "sb1", category: "Drinks", name: "Oatmilk Latte", allergens: { dairy: false, wheat: false, peanuts: false, soy: false }, notes: "Specify oatmilk to avoid cross-contamination." }
  ]
};