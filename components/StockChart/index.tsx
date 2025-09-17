import { useProductsSelect, useStocksSelect } from '@/states';
import { theme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Typography } from '../shared';

export const StockChart = () => {
  const products = useProductsSelect();
  const stocks = useStocksSelect();

  const stockByProduct = useMemo(() => {
    const items = products
      .map((product) => {
        const total = stocks.filter((s) => s.product_id === product.id).reduce((acc, s) => acc + s.amount, 0);

        return {
          value: total,
          text: product.name,
          color: product.color || theme.colors.primary,
        };
      })
      .filter((item) => !!item.value);

    const totalStock = items.reduce((acc, item) => acc + item.value, 0);

    return items.map((item) => ({
      ...item,
      percentage: `${((item.value / totalStock) * 100).toFixed(2).replace('.', ',')}%`,
    }));
  }, [products, stocks]);

  return (
    <View style={styles.container}>
      <Typography variant='label'>Estoque por produto</Typography>

      <PieChart donut data={stockByProduct} radius={120} innerRadius={80} innerCircleColor={theme.colors.gray900} />

      <View style={styles.legend}>
        {stockByProduct.map((item) => (
          <View key={item.text} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Typography variant='label'>{`${item.text} (${item.value} un. - ${item.percentage})`}</Typography>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  legend: {
    gap: 8,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
