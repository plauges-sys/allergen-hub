import { Restaurant } from "../types";
export const dq: Restaurant = { 
  name: "Dairy Queen", 
  tags: ["Fast Food", "Ice Cream"], 
  lastUpdated: "May 27 2026", 
  // ADD THIS BLOCK RIGHT HERE:
  restaurantNotes: "⚠️ GLOBAL CROSS-CONTACT NOTICE:\n" +
                   "DQ locations contain allergens that may come into contact with your food. Since allergens are present in every DQ location and cross-contact can easily occur, we cannot guarantee any item to be allergen free or the accuracy of the data as it relates to prepared menu items at a location. We suggest you inform the restaurant of any allergies prior to ordering and ask to see the ingredient listing on the packaging for the product you would like to purchase."+
                   "Fish/Shellfish:\n" +
                   "DQ locations use the same equipment (including fryers) to prepare fish/shellfish as is used for non-fish/shellfish items like French Fries. While the frying process typically denatures the allergenic protein, it is possible for the fish/shellfish allergenic protein to remain in the frying oil or on equipment surfaces and contact other DQ products."+
                   "Soybean Oil:\n" +
                   "Our frying oil is a vegetable oil blend with soybean oil. While soybean oil is not recognized as an allergen, consult your doctor as to whether you should avoid soybean oil."+
                   "Gluten Sensitive:\n" +
                   "Gluten is in many DQ products and cross contact may easily occur during product preparation. For those with gluten sensitivity, we recommend trying one of our manufactured novelties: Dilly Bars, Buster Bar Treats, Fudge Bars, Vanilla Orange Bars, or Starkiss® Bars, which can be found in clear, sealed plastic wrappers. These products are made without wheat, rye, oats, or barley in a facility that has limited cross contact risk. This does not include Dilly Bars or Buster Bar Treats in paper bags, which are made on the store premises and are subject to potential cross contact." +
                   "For more detailed information on food ingredients, we suggest you visit the U.S. Food and Drug Administration Center for Food Safety and Applied Nutrition website at www.cfsan.fda.gov. For more detailed information about food allergies, we suggest you visit the Food Allergy and Anaphylaxis Network website at www.foodallergy.org."+
                   "* Locally sourced ingredients are used in this menu item. Please verify allergens at your local restaurant.",
  items: [
   {
      id: "dq-lt-1", 
      category: "Limited Time",
      name: "Flamethrower Chicken Sandwich",
      allergens: {
        dairy: false,   
        wheat: true,    
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
        eggs: true,
        fish: false,
        shellfish: false,
        treenuts: false,
        sesame: true,
    },
      notes: ""
    },
    {
      id: "dq-lt-2",
      category: "Limited Time",
      name: "Flamethrower Chicken Strip Basket 4&6 Pc",
      allergens: {
        dairy: false,   
        wheat: true,    
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: false,
        eggs: true,
        fish: false,
        shellfish: false,
        treenuts: false,
        sesame: true,
      },
      notes: ""
    },
    // --- items below are yet to be updated with accurate allergen info ---
    {
      id: "dq-rice-1",
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
      id: "dq-protein-2",
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
      id: "dq-protein-3",
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
      id: "dq-protein-4",
      category: "Proteins",
      name: "dq Honey Vinaigrette",
      allergens: {
        dairy: false,
        wheat: false,
        peanuts: false,
        soy: false,
        gluten: false,
        sulphites: true,
      },
      notes: "Marinade used on Honey dq Chicken."+
        "All sulphites present in dq food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
        {
      id: "dq-tortilla-1",
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
      id: "dq-vegetables-1",
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
      id: "dq-tortilla-2",
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
      notes: "All sulphites present in dq food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "dq-topping-1",
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
      id: "dq-topping-2",
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
      id: "dq-topping-3",
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
      id: "dq-bean-2",
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
      id: "dq-topping-4",
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
      notes: "All sulphites present in dq food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "dq-topping-5",
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
      id: "dq-topping-6",
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
      id: "dq-topping-7",
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
      notes: "All sulphites present in dq food items come exclusively from vinegar, in which sulphites occur naturally below the concentration (10 ppm) to be required as a listed ingredient under federal law."+ 
        "However, with an interest in transparency and for any customers with extreme sensitivities, they chose to label menu items containing vinegar as possible allergens."
    },
    {
      id: "dq-topping-8",
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
      id: "dq-topping-9",
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
      id: "dq-protein-1",
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
      id: "dq-topping-10",
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
      id: "dq-topping-11",
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
      id: "dq-topping-12",
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
      id: "dq-side-1",
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
      id: "dq-rice-2",
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