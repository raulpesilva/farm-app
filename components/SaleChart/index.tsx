import { getColorByName } from '@/@types/product';
import { useProductsSelect, useSalesSelect } from '@/states';
import { theme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Typography } from '../shared';

export const SaleChart = () => {
  const products = useProductsSelect();
  const sales = useSalesSelect();
  const { width } = useWindowDimensions();

  const salesByProduct = useMemo(() => {
    if (!products.length || !sales.length) return [];
    return products.map((product) => {
      const totalValue = sales
        .filter((sale) => sale.product_id === product.id)
        .reduce((acc, sale) => acc + sale.total_price, 0);

      return {
        value: totalValue / 100,
        label: product.name,
        frontColor: getColorByName(product.color) || theme.colors.primary,
      };
    });
  }, [products, sales]);

  return (
    <View style={styles.container}>
      <Typography variant='label'>Vendas por produto</Typography>
      <BarChart
        data={salesByProduct}
        barWidth={8}
        spacing={40}
        roundedTop
        noOfSections={5}
        xAxisLabelTextStyle={styles.textBar}
        xAxisColor={theme.colors.gray700}
        yAxisTextStyle={styles.textBar}
        yAxisColor={theme.colors.gray700}
        rulesColor={theme.colors.gray700}
        width={width - 44}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    height: 256,
  },

  textBar: {
    color: theme.colors.gray200,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: theme.fontFamilies.inter_400,
  },
});
