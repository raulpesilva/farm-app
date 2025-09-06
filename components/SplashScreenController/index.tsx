import { useIsFontReadySelect } from '@/states';
import { SplashScreen } from 'expo-router';
import { useEffect, useMemo } from 'react';

SplashScreen.preventAutoHideAsync();

interface SplashScreenControllerProps {
  children: React.ReactNode;
}

export const SplashScreenController = ({ children }: SplashScreenControllerProps) => {
  const isFontReady = useIsFontReadySelect();
  // const [isAuthReady, setIsAuthReady] = useState(false);
  // const isReady = useMemo(() => [isFontReady, isAuthReady].every(Boolean), [isFontReady, isAuthReady]);
  const isReady = useMemo(() => [isFontReady].every(Boolean), [isFontReady]);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     dispatchUser(user);
  //     dispatchIsAuthenticated(!!user);
  //     setIsAuthReady(true);
  //   });

  //   return unSub;
  // }, []);

  return <>{children}</>;
};
