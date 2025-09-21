import { GoalItem } from '@/@types/goal';
import { theme } from '@/theme';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabItem } from '../TabItem';

const TABS_MEASURE = [
  { label: 'Meta de quantidade', value: 'quantity' } as const,
  { label: 'Meta de valor', value: 'price' } as const,
];

const TABS_TYPE = {
  quantity: [
    { label: 'Comprar', value: 'storage' },
    { label: 'Plantar', value: 'plant' },
    { label: 'Colher', value: 'harvest' },
    { label: 'Vender', value: 'sale' },
  ],
  price: [{ label: 'Vender', value: 'sale' }],
} as const;

type TabOption = (typeof TABS_TYPE)[keyof typeof TABS_TYPE][number];

interface TabsGoalProps {
  setMeasure: React.Dispatch<React.SetStateAction<GoalItem['measure']>>;
  setType: React.Dispatch<React.SetStateAction<GoalItem['type']>>;
}

export const TabsGoal = ({ setMeasure, setType }: TabsGoalProps) => {
  const [activeMeasure, setActiveMeasure] = useState(TABS_MEASURE[0]);
  const [activeType, setActiveType] = useState<TabOption>(TABS_TYPE.quantity[0]);

  const currentTypes = TABS_TYPE[activeMeasure.value];

  const handleMeasureChange = (tab: (typeof TABS_MEASURE)[number]) => {
    setActiveMeasure(tab);
    setActiveType(TABS_TYPE[tab.value][0]);
    setMeasure(tab.value);
    setType(TABS_TYPE[tab.value][0].value);
  };

  const handleTypeChange = (tab: TabOption) => {
    setActiveType(tab);
    setType(tab.value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {TABS_MEASURE.map((tab) => (
          <TabItem key={tab.value} item={tab} active={activeMeasure} setActive={() => handleMeasureChange(tab)} />
        ))}
      </View>

      <View style={styles.content}>
        {currentTypes.map((tab) => (
          <TabItem key={tab.value} item={tab} active={activeType} setActive={() => handleTypeChange(tab)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    minHeight: 88,
  },

  content: {
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },
});
