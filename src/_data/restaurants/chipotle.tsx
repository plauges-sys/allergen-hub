import { Restaurant } from "../types";
export const chipotle: Restaurant = { 
  name: "Chipotle", 
  tags: ["Fast Food", "Mexican"], 
  lastUpdated: "May 27 2026", 
  // ADD THIS BLOCK RIGHT HERE:
  restaurantNotes: "⚠️ GLOBAL CROSS-CONTACT NOTICE:\n" +
                   "Individual foods may come into contact with one another during preparation. " +
                   "Although Chipotle does not use eggs, mustard, peanuts, tree nuts, sesame, shellfish, or fish as ingredients, " +
                   "they cannot guarantee the complete absence of these allergens in their restaurants.\n\n" +
                   "🚀 TEST ITEMS:\n" +
                   "Limited time offerings or menu items in test may include one or more allergens not identified on this dashboard.",
  items: [
   {
      id: "chipotle-prot-1", 
      category: "Proteins",
      name: "Barbacoa",
      allergens: {
        dairy: false,   
        wheat: false,    
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-bean-1",
      category: "Beans",
      name: "Black Beans",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-rice-1",
      category: "Rice", 
      name: "Brown Rice",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-prot-2",
      category: "Proteins",
      name: "Carnitas",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: "Carnitas are made with pork."
    },
    {
      id: "chipotle-prot-3",
      category: "Proteins",
      name: "Chicken",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-prot-4",
      category: "Proteins",
      name: "Chipotle Honey Vinaigrette",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: true,
      },
      notes: "Marinade used on Honey Chipotle Chicken."+
        "All sulphites present in Chipotle food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
        {
      id: "chipotle-tortilla-1",
      category: "Tortillas",
      name: "Crispy Corn Tortilla",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
        {
      id: "chipotle-vegetables-1",
      category: "Vegetables",
      name: "Fajita Vegetables",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },

    {
      id: "chipotle-tortilla-2",
      category: "Tortillas",
      name: "Flour Tortilla (Burrito/Taco)",
      allergens: {
        dairy: false,
        wheat: true,
        peanuts: false,
        soy: false,
        gluten: true,
        sulphites: true,
      },
      notes: "All sulphites present in Chipotle food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "chipotle-topping-1",
      category: "Toppings",
      name: "Fresh Tomato Salsa",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-topping-2",
      category: "Toppings",
      name: "Guacamole",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-topping-3",
      category: "Toppings",
      name: "Monterey Jack Cheese",
      allergens: {
        dairy: true,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-bean-2",
      category: "Beans",
      name: "Pinto Beans",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-topping-4",
      category: "Toppings",
      name: "Red Chimichurri Sauce",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: true,
      },
      notes: "All sulphites present in Chipotle food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "chipotle-topping-5",
      category: "Toppings",
      name: "Roasted Chili-Corn Salsa",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-topping-6",
      category: "Toppings",
      name: "Romaine Lettuce",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-topping-7",
      category: "Toppings",
      name: "Sofritas",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: true,
        gluten: false,
        sulphites: true,
      },
      notes: "All sulphites present in Chipotle food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "chipotle-topping-8",
      category: "Toppings",
      name: "Queso Blanco",
      allergens: {
        dairy: true,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-topping-9",
      category: "Toppings",
      name: "Sour Cream",
      allergens: {
        dairy: true,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-prot-5",
      category: "Proteins",
      name: "Steak",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-topping-10",
      category: "Toppings",
      name: "Supergreens Lettuce Blend",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-topping-11",
      category: "Toppings",
      name: "Tomatillo Green-Chili Salsa",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-topping-12",
      category: "Toppings",
      name: "Tomatillo Red-Chili Salsa",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },    {
      id: "chipotle-side-1",
      category: "Side",
      name: "Tortilla Chips",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    {
      id: "chipotle-rice-2",
      category: "Rice",
      name: "White Rice",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },





    /* HOW TO ADD A NEW ITEM (TEMPLATE COPIER):
    Uncomment or copy-paste this block to add a new menu item:
    {
      id: "unique-id",
      category: "Category Name",
      name: "Item Name",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
      },
      notes: ""
    },
    */
  ],
};