// 1. Define the blueprint for what every theme object MUST contain
export interface ThemeColors {
  mode: 'light' | 'dark' | 'brand';
  background: string;
  cardBackground: string;
  text: string;
  textMuted: string;
  primaryButton: string;
  buttonText: string;
  brandHeader?: string; // Optional because standard light/dark modes don't use it
}

// 2. Define your default system themes
export const defaultThemes: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    mode: 'light',
    background: '#ffffff',
    cardBackground: '#f8f9fa',
    text: '#000000',
    textMuted: '#6c757d',
    primaryButton: '#007bff', // Standard blue
    buttonText: '#ffffff',
  },
  dark: {
    mode: 'dark',
    background: '#121212',
    cardBackground: '#1e1e1e',
    text: '#ffffff',
    textMuted: '#a0a0a0',
    primaryButton: '#1e88e5', // Slightly lighter blue for dark mode readability
    buttonText: '#ffffff',
  },
};

// 3. A helper function to build a dynamic restaurant brand theme on the fly
export const buildBrandTheme = (
  primaryColor?: string,
  buttonColor?: string,
  isDarkBase = false
): ThemeColors => {
  // Use light or dark mode as the base foundation
  const base = isDarkBase ? defaultThemes.dark : defaultThemes.light;
  
  return {
    ...base,
    mode: 'brand',
    // If the base is dark, use a deep slate color for cards, otherwise a soft gray-blue
    cardBackground: isDarkBase ? '#1a2238' : '#f4f6f9',
    
    // Inject the restaurant's specific brand colors, or fallback to defaults if missing
    primaryButton: buttonColor || base.primaryButton, 
    brandHeader: primaryColor || buttonColor || base.primaryButton,   
    
    // Ensure text remains highly readable against the background
    text: isDarkBase ? '#ffffff' : '#111111',
  };
};