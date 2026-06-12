import { ThemeColors, buildBrandTheme } from './themeStyles';

// 1. Define what a Restaurant Brand Profile must look like
export interface BrandProfile {
  id: string;
  name: string;
  primaryColor: string;    // Used for headers, top navigation bars
  buttonColor: string;     // Used for call-to-action buttons (e.g., Order Online)
  isDarkBase: boolean;     // True if the restaurant wants a dark aesthetic website integration
  logoUrl?: string;        // Optional URL to pull in their specific logo image
}

// 2. The Restaurant Database Matrix
export const brandRegistry: Record<string, BrandProfile> = {
  
  // ==========================================
  // ACTIVE BRAND: DJ's Drive In
  // ==========================================
  'djs-drive-in': {
    id: 'djs-drive-in',
    name: "DJ's Drive In",
    primaryColor: '#1d3557', // Deep classic blue from their logo/header
    buttonColor: '#2a6f97',  // Steel blue/teal from their "VIEW MENU" buttons
    isDarkBase: false,       // Light, clean backdrop mimicking their white ordering layout
    logoUrl: 'https://djsdrivein.com/logo.png', 
  },

  // ==========================================
  // TEMPLATE SECTION: FUTURE CLIENT BRANDS
  // ==========================================
  
  // Template 1: Classic Fast Casual / Burger Joint (Warm, high-energy colors)
  'template-warm': {
    id: 'template-warm',
    name: 'Warm Brand Template',
    primaryColor: '#d90429', // Deep red
    buttonColor: '#f77f00',  // Vibrant orange accent
    isDarkBase: false,
  },

  // Template 2: Modern Bistro / Upscale Cafe (Earthy, muted tones)
  'template-earthy': {
    id: 'template-earthy',
    name: 'Earthy Brand Template',
    primaryColor: '#2c6e49', // Forest green
    buttonColor: '#4c9a2a', // Leaf green accent
    isDarkBase: false,
  },

  // Template 3: Trendy Night Spot / Bar & Grill (Sleek dark mode interface)
  'template-dark-lounge': {
    id: 'template-dark-lounge',
    name: 'Dark Lounge Template',
    primaryColor: '#0f0f10', // Near pitch black
    buttonColor: '#ff007f',  // Neon pink or electric purple call-to-action
    isDarkBase: true,        // Automatically loads slate dark cards and text
  },
};

// 3. Helper function to instantly generate a theme by Restaurant ID
export const getThemeByRestaurantId = (id: string): ThemeColors => {
  const brand = brandRegistry[id];
  
  if (!brand) {
    // Fallback if the restaurant ID isn't found or is typed incorrectly
    return buildBrandTheme(); 
  }
  
  return buildBrandTheme(brand.primaryColor, brand.buttonColor, brand.isDarkBase);
};