import { Button, KeyboardAvoiding, Typography, WithoutProduct } from '@/components';
import { useProductsSelect } from '@/states/products';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function SaleDashboard() {
  const products = useProductsSelect();
  const router = useRouter();

  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        {!products?.length && <WithoutProduct />}
        {products?.length && (
          <Button onPress={() => router.navigate({ pathname: '/add/[type]', params: { type: 'sell' } })}>
            <Typography>Cadastrar uma venda</Typography>
          </Button>
        )}
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
