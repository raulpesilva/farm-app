import { GoalIcon, ProductIcon, SaleIcon, StockIcon } from '@/components';
import { theme } from '@/theme';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

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

export default function TabsLayout() {
  const isOs = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: isOs ? 72 : 62,
          paddingTop: 12,
          backgroundColor: theme.colors.gray900,
          borderTopWidth: 0,
        },
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
        tabBarLabel: () => null,
        headerRight: () => <StockIcon color={theme.colors.gray200} />,
        headerLeft: () => <SaleIcon color={theme.colors.gray200} style={{ marginLeft: 24 }} />,
        headerStatusBarHeight: isOs ? 0 : 24,
        headerStyle: { backgroundColor: theme.colors.gray900, shadowColor: 'transparent' },
        title: '',
      }}
    >
      <Tabs.Screen name='stocks/index' options={{ tabBarIcon: TabBarIcon(StockIcon) }} />
      <Tabs.Screen name='stocks/add' options={{ href: null }} />

      <Tabs.Screen name='sales/index' options={{ tabBarIcon: TabBarIcon(SaleIcon) }} />
      <Tabs.Screen name='sales/add' options={{ href: null }} />

      <Tabs.Screen name='goals/index' options={{ tabBarIcon: TabBarIcon(GoalIcon) }} />
      <Tabs.Screen name='goals/add' options={{ href: null }} />

      <Tabs.Screen name='products/index' options={{ tabBarIcon: TabBarIcon(ProductIcon) }} />
      <Tabs.Screen name='products/add' options={{ href: null }} />
      <Tabs.Screen name='products/[id]' options={{ href: null }} />
    </Tabs>
  );
}
