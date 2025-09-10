import { KeyboardAvoiding, WithoutProduct } from '@/components';
import { useProductsSelect } from '@/states/products';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function StockDashboard() {
  const products = useProductsSelect();
  console.log(products);

  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>{!products?.length && <WithoutProduct />}</SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
