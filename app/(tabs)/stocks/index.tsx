import { EmptyProducts } from '@/components';
import { useProductsSelect } from '@/states';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Stocks() {
  const products = useProductsSelect();

  return <SafeAreaView style={styles.container}>{!products?.length && <EmptyProducts />}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
