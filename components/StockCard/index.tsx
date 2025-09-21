import { COLOR_MAP } from '@/@types/product';
import { theme } from '@/theme';
import { StyleSheet, View } from 'react-native';
import { Icon, ICON_MAP, Typography } from '../shared';

interface StockCardProps {
  product: string;
  productIcon: keyof typeof ICON_MAP;
  productColor: keyof typeof COLOR_MAP;
  storage: number;
  plant: number;
  harvest: number;
}

export const StockCard = ({ product, productIcon, productColor, storage, plant, harvest }: StockCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContent}>
        <Icon type={productIcon} color={productColor} />
      </View>

      <View style={styles.names}>
        <Typography style={styles.title} variant='heading3'>
          {product}
        </Typography>
        <Typography style={styles.text}>Estoque</Typography>
        <Typography style={styles.text}>Plantado</Typography>
        <Typography style={styles.text}>Colhido</Typography>
      </View>

      <View style={styles.values}>
        <Typography variant='label'>{`${storage} un.`}</Typography>
        <Typography variant='label'>{`${plant} un.`}</Typography>
        <Typography variant='label'>{`${harvest} un.`}</Typography>
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
    justifyContent: 'flex-end',
  },

  title: {
    marginBottom: 6,
  },

  text: {
    color: theme.colors.gray200,
  },
});
