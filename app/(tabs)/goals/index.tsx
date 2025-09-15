import { Button, Empty, GoalCard, Typography } from '@/components';
import { getGoals, getProducts } from '@/services';
import { dispatchGoals, dispatchProducts, useGoalsSelect, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Goals() {
  const router = useRouter();
  const products = useProductsSelect();
  const goals = useGoalsSelect();
  const [loading, setLoading] = useState(goals.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, goalsData] = await Promise.all([getProducts(), getGoals()]);
        dispatchProducts(productsData);
        dispatchGoals(goalsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !goals?.length) {
    return (
      <View style={styles.container}>
        <Typography style={styles.loading} variant='heading3'>
          Carregando metas...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!!products?.length && !goals?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhuma meta?' button='Cadastrar meta' link='/goals/add' />
      )}

      {!!products?.length && !!goals?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/goals/add')}>
            <Typography variant='label'>Cadastrar meta</Typography>
          </Button>

          <FlatList
            data={goals}
            renderItem={({ item }) => {
              const product = products.find((product) => product.id === item.product_id);
              return (
                <GoalCard
                  product={product?.name || ''}
                  productIcon={product?.icon || 'goal'}
                  title={item.title}
                  measure={item.measure}
                  type={item.type}
                  value={item.value}
                  target={item.target}
                />
              );
            }}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
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

  listContent: {
    paddingBottom: 8,
  },

  separator: {
    height: 8,
  },
});
