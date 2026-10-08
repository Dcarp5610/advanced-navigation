// Imports the built-in light and dark navigation themes,
// the Stack navigator, and the ThemeProvider from Expo Router.
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';

// Provides control over the Expo splash screen.
import * as SplashScreen from 'expo-splash-screen';

// Gets the device's current light/dark colour scheme.
import { useColorScheme } from 'react-native';

// Displays the animated splash screen overlay.
import { AnimatedSplashOverlay } from '@/components/animated-icon';

// Provides shared interaction state for posts,
// such as likes and reposts across different screens.
import { PostInteractionProvider } from '@/components/PostInteractionContext';

// Prevents the native splash screen from disappearing automatically.
// This allows the custom animated splash screen to be displayed.
SplashScreen.preventAutoHideAsync();

// Root layout for the entire application.
export default function RootLayout() {

  // Gets the current device colour scheme.
  const colorScheme = useColorScheme();

  return (
    // Provides the appropriate navigation theme
    // based on whether the device is using dark or light mode.
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >

      {/* Makes post interaction state available throughout the app. */}
      <PostInteractionProvider>

        {/* Displays the custom animated splash screen overlay. */}
        <AnimatedSplashOverlay />

        {/* Main Stack navigator for the application. */}
        <Stack
          screenOptions={{
            // Hides the default navigation headers
            // so each screen can use its own design.
            headerShown: false,
          }}
        >

          {/* Main tab navigation containing the five app tabs. */}
          <Stack.Screen name="(tabs)" />

          {/* Stack screen used to display individual post details. */}
          <Stack.Screen name="post/[id]" />
        </Stack>

      </PostInteractionProvider>
    </ThemeProvider>
  );
}