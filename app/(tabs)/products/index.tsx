import { EmptyProducts } from '@/components';
import { useProductsSelect } from '@/states/products';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Products() {
  const products = useProductsSelect();

  return <SafeAreaView style={styles.container}>{!products?.length && <EmptyProducts />}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
