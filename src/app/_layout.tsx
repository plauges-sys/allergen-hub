import { Stack } from 'expo-router';
import { ThemeProvider } from '../theme/ThemeContext'; // Double check this path matches your folder layout!

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}