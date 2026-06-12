import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { defaultThemes, ThemeColors } from './themeStyles';

// 1. Expand the interface to allow forcing 'light', 'dark', or resetting to 'system'
interface ThemeContextType {
  colors: ThemeColors;
  themeMode: 'light' | 'dark' | 'system' | 'brand';
  applyRestaurantBrand: (brandTheme: ThemeColors) => void;
  setExplicitTheme: (mode: 'light' | 'dark' | 'system') => void;
  resetToSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceScheme = useColorScheme(); // 'light' or 'dark' from the OS
  
  // Track what the user explicitly wants: 'system', 'light', or 'dark'
  const [userPreference, setUserPreference] = useState<'light' | 'dark' | 'system'>('system');
  
  // Track the actual compiled colors active right now
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(
    defaultThemes[deviceScheme || 'light']
  );

  // Determine what the base theme mode should be based on preference vs device
  const activeBaseMode = userPreference === 'system' ? (deviceScheme || 'light') : userPreference;

  // Sync theme when phone settings change OR when user explicitly toggles a preference
  useEffect(() => {
    if (currentTheme.mode !== 'brand') {
      setCurrentTheme(defaultThemes[activeBaseMode]);
    }
  }, [deviceScheme, userPreference]);

  // Command 1: Force manual light or dark override
  const setExplicitTheme = (mode: 'light' | 'dark' | 'system') => {
    setUserPreference(mode);
    if (mode !== 'system') {
      setCurrentTheme(defaultThemes[mode]);
    } else {
      setCurrentTheme(defaultThemes[deviceScheme || 'light']);
    }
  };

  // Command 2: Apply restaurant branding layout
  const applyRestaurantBrand = (brandTheme: ThemeColors) => {
    setCurrentTheme(brandTheme);
  };

  // Command 3: Clear brand layout and drop back to the user's preferred baseline
  const resetToSystemTheme = () => {
    setCurrentTheme(defaultThemes[activeBaseMode]);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        colors: currentTheme, 
        themeMode: currentTheme.mode === 'brand' ? 'brand' : userPreference,
        applyRestaurantBrand, 
        setExplicitTheme, 
        resetToSystemTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider wrapper');
  }
  return context;
};