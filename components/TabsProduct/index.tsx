import { theme } from '@/theme';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';
import { TabItem } from '../TabItem';

export interface TabProps {
  label: string;
  link: Href;
}

interface TabsProductProps {
  tabs: TabProps[];
}

export const TabsProduct = ({ tabs }: TabsProductProps) => {
  const router = useRouter();
  const [active, setActive] = useState(tabs[1]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab, i) => (
          <TabItem key={`tab-${tab.label}-${i}`} item={tab} active={active} setActive={setActive} />
        ))}
      </View>

      <Button variant='contained' onPress={() => router.push(active.link)}>
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
