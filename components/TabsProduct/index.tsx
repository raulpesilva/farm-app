import { theme } from '@/theme';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';
import { TabItem } from '../TabItem';

export interface TabProps {
  label: string;
  link?: Href;
}

const TABS_PRODUCT: TabProps[] = [
  {
    label: 'Estoque',
    link: '/stocks/add',
  },
  {
    label: 'Meta',
    link: '/goals/add',
  },
  {
    label: 'Venda',
    link: '/sales/add',
  },
];

export const TabsProduct = () => {
  const router = useRouter();
  const [active, setActive] = useState(TABS_PRODUCT[1]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {TABS_PRODUCT.map((tab) => (
          <TabItem key={tab.label} item={tab} active={active} setActive={setActive} />
        ))}
      </View>

      <Button variant='contained' onPress={() => router.push(active.link || '/products/add')}>
        <Typography variant='label'>Cadastrar</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  content: {
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 2,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },
});
