import { ProductItem } from '@/@types/product';
import { theme } from '@/theme';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Typography } from '../shared';

type ProductCardProps = Pick<ProductItem, 'id' | 'name' | 'icon' | 'color'>;

export const ProductCard = ({ id, name, icon, color }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContent}>
        <Icon type={icon} color={color} />
      </View>

      <Typography variant='heading3'>{name}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },

  iconContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.gray900,
  },
});
