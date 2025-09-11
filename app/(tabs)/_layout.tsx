import { ButtonIcon, GoalIcon, ProductIcon, SaleIcon, StockIcon, Typography } from '@/components';
import { useUnreadNotificationsCount } from '@/hooks';
import { useProductsSelect } from '@/states/products';
import { theme } from '@/theme';
import { Router, Tabs, usePathname, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';

interface NotificationProps {
  router: Router;
  isNotifications: boolean;
}

interface AccountProps {
  router: Router;
  isAccount: boolean;
}

const TabBarIcon = (Icon: React.FC<{ color: string }>) => {
  const IconElem = ({ focused }: { focused: boolean }) => (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: focused ? theme.colors.gray500 : theme.colors.gray900,
        animationDuration: 300,
      }}
    >
      <Icon color={focused ? theme.colors.gray50 : theme.colors.gray200} />
    </View>
  );
  return IconElem;
};

const NotificationTab = ({ router, isNotifications }: NotificationProps) => {
  const unreadNotificationsCount = useUnreadNotificationsCount();
  const backgroundColor = isNotifications ? theme.colors.gray700 : undefined;

  return (
    <View style={{ position: 'relative', marginLeft: 20 }}>
      <ButtonIcon icon='notification' onPress={() => router.push('/notifications')} style={{ backgroundColor }} />
      {unreadNotificationsCount > 0 && (
        <View
          style={{
            width: 18,
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 18,
            position: 'absolute',
            top: -2,
            right: -2,
          }}
        >
          <Typography style={{ textAlign: 'center' }}>{`${unreadNotificationsCount}`}</Typography>
        </View>
      )}
    </View>
  );
};

const AccountTab = ({ router, isAccount }: AccountProps) => {
  const backgroundColor = isAccount ? theme.colors.gray700 : undefined;

  return (
    <ButtonIcon icon='configs' onPress={() => router.push('/account')} style={{ marginRight: 20, backgroundColor }} />
  );
};

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const products = useProductsSelect();

  const isOs = Platform.OS === 'ios';
  const isNotifications = pathname.startsWith('/notifications');
  const isAccount = pathname.startsWith('/account');
  const hasProducts = !!products?.length;

  const defaultOptions = useMemo(() => {
    if (hasProducts) return {};
    return { href: null };
  }, [hasProducts]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: isOs ? 72 : 62,
          paddingTop: 12,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        },
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
        tabBarLabel: () => null,
        headerLeft: () => <NotificationTab router={router} isNotifications={isNotifications} />,
        headerRight: () => <AccountTab router={router} isAccount={isAccount} />,
        headerStatusBarHeight: isOs ? 0 : 24,
        headerStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' },
        title: '',
      }}
    >
      <Tabs.Screen name='stocks/index' options={{ tabBarIcon: TabBarIcon(StockIcon), ...defaultOptions }} />
      <Tabs.Screen name='stocks/add' options={{ href: null }} />

      <Tabs.Screen name='sales/index' options={{ tabBarIcon: TabBarIcon(SaleIcon), ...defaultOptions }} />
      <Tabs.Screen name='sales/add' options={{ href: null }} />

      <Tabs.Screen name='goals/index' options={{ tabBarIcon: TabBarIcon(GoalIcon), ...defaultOptions }} />
      <Tabs.Screen name='goals/add' options={{ href: null }} />

      <Tabs.Screen name='products/index' options={{ tabBarIcon: TabBarIcon(ProductIcon), ...defaultOptions }} />
      <Tabs.Screen name='products/add' options={{ href: null }} />
      <Tabs.Screen name='products/[id]' options={{ href: null }} />

      <Tabs.Screen name='notifications/index' options={{ href: null }} />
      <Tabs.Screen name='account/index' options={{ href: null }} />
    </Tabs>
  );
}
