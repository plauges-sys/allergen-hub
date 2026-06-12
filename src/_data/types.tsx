export interface MenuItem {
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
}

export interface Restaurant {
  name: string;
  tags: string[];
  lastUpdated: string;
  restaurantNotes?: string; // <-- ADD THIS (The question mark makes it optional!)
  items: MenuItem[];
}

export interface RestaurantDatabase {
  [key: string]: Restaurant;
}