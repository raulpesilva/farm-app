import { COLOR_MAP } from '@/@types/product';
import { Sale } from '@/@types/transactions';
import { theme } from '@/theme';
import { formatBRLCurrencyDisplay } from '@/utils';
import { StyleSheet, View } from 'react-native';
import { Icon, ICON_MAP, Typography } from '../shared';

interface SaleCardProps extends Pick<Sale, 'price' | 'quantity' | 'total_price'> {
  product: string;
  productIcon: keyof typeof ICON_MAP;
  productColor: keyof typeof COLOR_MAP;
}

export const SaleCard = ({ product, productIcon, productColor, price, quantity, total_price }: SaleCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContent}>
        <Icon type={productIcon} color={productColor} />
      </View>

      <View style={styles.names}>
        <Typography variant='heading3'>{product}</Typography>
        <Typography style={styles.text}>{`${formatBRLCurrencyDisplay(price)}/un.`}</Typography>
      </View>

      <View style={styles.values}>
        <Typography variant='label'>{`${quantity}`}</Typography>
        <Typography variant='label'>{formatBRLCurrencyDisplay(total_price)}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
    gap: 12,
    marginVertical: 4,
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
});
