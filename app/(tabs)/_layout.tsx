import { AddIcon, SaleIcon, StockIcon } from '@/components';
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
        headerShown: false,
        tabBarStyle: {
          height: isOs ? 72 : 62,
          paddingTop: 12,
          backgroundColor: theme.colors.gray900,
          borderTopWidth: 0,
        },
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' },
        tabBarLabel: () => null,
      }}
    >
      <Tabs.Screen name='stockDashboard' options={{ tabBarIcon: TabBarIcon(StockIcon) }} />
      <Tabs.Screen name='add/[type]' options={{ tabBarIcon: TabBarIcon(AddIcon), title: 'add' }} />
      <Tabs.Screen name='saleDashboard' options={{ tabBarIcon: TabBarIcon(SaleIcon) }} />
      <Tabs.Screen name='products/[id]' options={{ href: null }} />
      <Tabs.Screen name='products/index' options={{ href: null }} />
      <Tabs.Screen name='products/add' options={{ href: null }} />
    </Tabs>
  );
}
