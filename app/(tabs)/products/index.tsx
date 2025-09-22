import { Button, Empty, ProductCard, Typography } from '@/components';
import { getProducts } from '@/services';
import { dispatchProducts, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Products() {
  const router = useRouter();
  const products = useProductsSelect();
  const [loading, setLoading] = useState(products.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        dispatchProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading && !products?.length) {
    return (
      <View style={styles.container}>
        <Typography style={styles.loading} variant='heading3'>
          Carregando produtos...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!!products?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/products/add')}>
            <Typography variant='label'>Cadastrar produto</Typography>
          </Button>

          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard id={item.id} name={item.name} icon={item.icon} color={item.color} />}
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
    height: '100%',
  },

  separator: {
    height: 8,
  },
});
