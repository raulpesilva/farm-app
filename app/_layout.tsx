import { SplashScreenController } from '@/components';
import { dispatchIsFontReady, useIsAuthenticatedSelect } from '@/states';
import { theme } from '@/theme';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainRoutes = () => {
  const isAuthenticated = useIsAuthenticatedSelect();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name='(public)' />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}></Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => dispatchIsFontReady(fontsLoaded), [fontsLoaded]);

  return (
    <SafeAreaView style={[styles.container, StyleSheet.absoluteFill]} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={theme.colors.gray900} barStyle='light-content' translucent />
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
