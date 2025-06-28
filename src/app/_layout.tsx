import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { QueryClientProvider } from '@tanstack/react-query';
import client from '@/src/lib/react-query';
import AlertProvider from '../providers/alert.provider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Disable reanimated warnings
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {

  const [loaded, error] = useFonts({
    ['SpaceMono']: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ['IBMPlexSansArabic-Regular']: require('../../assets/fonts/IBMPlexSansArabic-Regular.ttf'),
    ['IBMPlexSansArabic-SemiBold']: require('../../assets/fonts/IBMPlexSansArabic-SemiBold.ttf'),
    ['IBMPlexSansArabic-Bold']: require('../../assets/fonts/IBMPlexSansArabic-Bold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      if (error) {
        console.warn(`Error in loading fonts: ${error}`);
      }
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <AlertProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AlertProvider>
    </QueryClientProvider>
  );
}
