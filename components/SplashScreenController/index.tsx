import { logout } from '@/functions';
import { getMyFarm } from '@/services';
import { dispatchFarm, dispatchToken, useIsFontReadySelect } from '@/states';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

SplashScreen.preventAutoHideAsync();

interface SplashScreenControllerProps {
  children: React.ReactNode;
}

export const SplashScreenController = ({ children }: SplashScreenControllerProps) => {
  const isFontReady = useIsFontReadySelect();
  const [isRestored, setIsRestored] = useState(false);
  const isReady = useMemo(() => [isFontReady, isRestored].every(Boolean), [isFontReady, isRestored]);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatchToken(token);
          const farm = await getMyFarm();
          if (farm) dispatchFarm(farm);
        }
      } catch (e) {
        console.warn('Error restoring token and farm from AsyncStorage', e);
        logout();
      } finally {
        setIsRestored(true);
      }
    };

    restoreState();
  }, []);

  return <>{children}</>;
};
