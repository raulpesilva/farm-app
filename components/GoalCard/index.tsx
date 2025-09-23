import { COLORS_GOAL, GoalItem, MEASURE_GOAL, TYPE_GOAL } from '@/@types/goal';
import { theme } from '@/theme';
import { formatBRLCurrencyDisplay } from '@/utils';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ICON_MAP, Typography } from '../shared';

interface GoalCardProps extends Pick<GoalItem, 'name' | 'measure' | 'type' | 'value' | 'target'> {
  product: string;
  productIcon: keyof typeof ICON_MAP;
}

export const GoalCard = ({ product, productIcon, name, measure, type, value, target }: GoalCardProps) => {
  const color = COLORS_GOAL[type];

  const formattedTarget = useMemo(() => {
    return measure === 'price' ? formatBRLCurrencyDisplay(target) : String(target);
  }, [measure, target]);

  const percentageCompleted = useMemo(() => {
    if (!target || value === 0) return 0;
    const percentage = (value / target) * 100;
    return percentage > 100 ? 100 : Math.round(percentage);
  }, [target, value]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContent}>
        <View style={styles.iconContent}>
          <Icon type={productIcon} color={color} />
        </View>

        <View style={styles.names}>
          <Typography variant='label'>{name}</Typography>
          <Typography style={styles.text}>
            {TYPE_GOAL[type]} - {product}
          </Typography>
        </View>

        <View style={styles.values}>
          <Typography variant='label'>{formattedTarget}</Typography>
          <Typography style={styles.text}>{MEASURE_GOAL[measure]}</Typography>
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
