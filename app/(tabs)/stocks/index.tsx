import { Button, Empty, StockCard, StockChart, Typography } from '@/components';
import { getTransactionsRequest } from '@/services/getTransactions';
import {
  dispatchStocks,
  useProductsSelect,
  useStocksSelect
} from '@/states';
import { groupByStock } from '@/utils';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

export default function Stocks() {
  const router = useRouter();
  const products = useProductsSelect();
  const transactions = useStocksSelect();
  const [loading, setLoading] = useState(transactions.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const transactions = await getTransactionsRequest();
        dispatchStocks(transactions);
        // const [productsData, salesData, goalsData, notificationsData] = await Promise.all([
        //   getProducts(),
        //   getSales(),
        //   getGoals(),
        //   getNotifications(),
        // ]);
        // dispatchProducts(productsData);
        // dispatchSales(salesData);
        // dispatchGoals(goalsData);
        // dispatchNotifications(notificationsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const group = useMemo(() => groupByStock(transactions), [transactions]);

  if (loading && !transactions?.length) {
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

      {!!products?.length && !transactions?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhum estoque?' button='Cadastrar estoque' link='/stocks/add' />
      )}

      {!!products?.length && !!transactions?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/stocks/add')}>
            <Typography variant='label'>Cadastrar estoque</Typography>
          </Button>

          <SectionList
            sections={group}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => `${item.id}-${i}`}
            ListHeaderComponent={() => <StockChart />}
            renderItem={({ item }) => {
              const product = products.find((product) => product.id === item.product_id);
              return (
                <StockCard
                  product={product?.name || ''}
                  productIcon={product?.icon || 'sale'}
                  productColor={product?.color || ''}
                  storage={item.storage}
                  plant={item.plant}
                  harvest={item.harvest}
                />
              );
            }}
          />
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
