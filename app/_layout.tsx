import { SplashScreenController } from '@/components';
import { dispatchIsFontReady, useHasFarmSelect, useIsAuthenticatedSelect } from '@/states';
import { theme } from '@/theme';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainRoutes = () => {
  const isAuthenticated = useIsAuthenticatedSelect();
  const hasFarm = useHasFarmSelect();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name='(public)' />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated && !hasFarm}>
          <Stack.Screen name='addFarm' />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated && hasFarm}>
          <Stack.Screen name='(tabs)' />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium });

  useEffect(() => dispatchIsFontReady(fontsLoaded), [fontsLoaded]);

  return (
    <SafeAreaView style={[styles.container, StyleSheet.absoluteFill]} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={'transparent'} barStyle='light-content' translucent />
      <SplashScreenController>
        <MainRoutes />
      </SplashScreenController>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray900,
  },
});
