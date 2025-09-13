import { GoalItem, TYPE_GOAL } from '@/@types/goal';
import { theme } from '@/theme';
import { formatCurrency } from '@/utils';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Typography } from '../shared';

interface GoalCardProps extends Pick<GoalItem, 'title' | 'type' | 'value' | 'target'> {
  product: string;
}

export const GoalCard = ({ product, title, type, value, target }: GoalCardProps) => {
  const color = type === 'amount' ? theme.colors.success : theme.colors.primary;

  const formattedValue = useMemo(() => {
    return type === 'amount' ? formatCurrency(value) : String(value);
  }, [type, value]);

  const percentageCompleted = useMemo(() => {
    if (!target || value === 0) return 0;
    const percentage = (target / value) * 100;
    return percentage > 100 ? 100 : Math.round(percentage);
  }, [target, value]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContent}>
        <View style={styles.iconContent}>
          <Icon type='goal' color={color} />
        </View>

        <View style={styles.names}>
          <Typography variant='label'>{title}</Typography>
          <Typography style={styles.text}>{product}</Typography>
        </View>

        <View style={styles.values}>
          <Typography variant='label'>{formattedValue}</Typography>
          <Typography style={styles.text}>{TYPE_GOAL[type]}</Typography>
        </View>
      </View>

      <View style={styles.progressContent}>
        <Typography style={styles.percentage}>{`${percentageCompleted}%`}</Typography>
        <View style={styles.progress}>
          <View style={[styles.bar, { width: `${percentageCompleted}%`, backgroundColor: color }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
    gap: 4,
  },

  infoContent: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },

  iconContent: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.gray900,
  },

  names: {
    flex: 1,
    gap: 2,
  },

  values: {
    gap: 2,
    alignItems: 'flex-end',
  },

  text: {
    color: theme.colors.gray200,
  },

  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  percentage: {
    minWidth: 32,
    textAlign: 'center',
  },

  progress: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },

  bar: {
    height: '100%',
    borderRadius: 4,
  },
});
