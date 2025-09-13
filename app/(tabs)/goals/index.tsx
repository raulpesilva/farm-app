import { Button, Empty, GoalCard, Typography } from '@/components';
import { useGoalsSelect, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Goals() {
  const products = useProductsSelect();
  const goals = useGoalsSelect();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!goals?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhuma meta?' button='Cadastrar meta' link='/goals/add' />
      )}

      {!!goals?.length && (
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
                  title={item.title}
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
