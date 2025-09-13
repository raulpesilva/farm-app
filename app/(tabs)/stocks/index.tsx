import { Button, Empty, Typography } from '@/components';
import { useProductsSelect, useStocksSelect } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Stocks() {
  const router = useRouter();
  const products = useProductsSelect();
  const stocks = useStocksSelect();

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!stocks?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhum estoque?' button='Cadastrar estoque' link='/stocks/add' />
      )}

      {!!stocks?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/stocks/add')}>
            <Typography variant='label'>Cadastrar estoque</Typography>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    gap: 24,
  },
});
