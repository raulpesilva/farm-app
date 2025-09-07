import { KeyboardAvoiding, WithoutProduct } from '@/components';
import { useProductsSelect } from '@/states/products';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function SaleDashboard() {
  const products = useProductsSelect();

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
