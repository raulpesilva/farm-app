import { Button, Empty, Typography } from '@/components';
import { getGoals, getNotifications, getProducts, getSales, getStocks } from '@/services';
import {
  dispatchGoals,
  dispatchNotifications,
  dispatchProducts,
  dispatchSales,
  dispatchStocks,
  useProductsSelect,
  useStocksSelect,
} from '@/states';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Stocks() {
  const router = useRouter();
  const products = useProductsSelect();
  const stocks = useStocksSelect();
  const [loading, setLoading] = useState(stocks.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, stocksData, salesData, goalsData, notificationsData] = await Promise.all([
          getProducts(),
          getStocks(),
          getSales(),
          getGoals(),
          getNotifications(),
        ]);
        dispatchProducts(productsData);
        dispatchStocks(stocksData);
        dispatchSales(salesData);
        dispatchGoals(goalsData);
        dispatchNotifications(notificationsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !stocks?.length) {
    return (
      <View style={styles.container}>
        <Typography style={styles.loading} variant='heading3'>
          Carregando estoques...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!!products?.length && !stocks?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhum estoque?' button='Cadastrar estoque' link='/stocks/add' />
      )}

      {!!products?.length && !!stocks?.length && (
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

  loading: {
    margin: 'auto',
    textAlign: 'center',
  },

  content: {
    flex: 1,
    gap: 24,
  },
});
