import { theme } from '@/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../shared';
import { TabProps } from '../TabsProduct';

interface TabItemProps {
  item: TabProps;
  active: TabProps;
  setActive: (item: TabProps) => void;
}

export const TabItem = ({ item, active, setActive }: TabItemProps) => {
  return (
    <TouchableOpacity style={[styles.container, item === active && styles.active]} onPress={() => setActive(item)}>
      <Typography variant='label' style={item === active && styles.activeText}>
        {item.label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },

  active: {
    backgroundColor: theme.colors.gray300,
  },

  activeText: {
    color: theme.colors.gray50,
  },
});
