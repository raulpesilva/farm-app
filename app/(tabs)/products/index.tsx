import { Button, Empty, ProductCard, Typography } from '@/components';
import { useProductsSelect } from '@/states';
import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Products() {
  const products = useProductsSelect();

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
