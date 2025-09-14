import { Button, Empty, SaleCard, SaleChart, Typography } from '@/components';
import { useProductsSelect, useSalesSelect } from '@/states';
import { theme } from '@/theme';
import { groupByDate } from '@/utils';
import { useRouter } from 'expo-router';
import { SectionList, StyleSheet, View } from 'react-native';

const SaleHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.title}>
      <Typography variant='label'>{title}</Typography>
    </View>
  );
};

export default function Sales() {
  const router = useRouter();
  const products = useProductsSelect();
  const sales = useSalesSelect();

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!sales?.length && (
        <Empty text=' Vocês ainda não cadastrou nenhuma venda?' button='Cadastrar venda' link='/sales/add' />
      )}

      {!!sales?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/sales/add')}>
            <Typography variant='label'>Cadastrar venda</Typography>
          </Button>

          <SectionList
            sections={groupByDate(sales)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => `${item.id}-${i}`}
            ListHeaderComponent={() => <SaleChart />}
            renderSectionHeader={({ section: { title } }) => <SaleHeader title={title} />}
            renderItem={({ item }) => {
              const product = products.find((product) => product.id === item.product_id);
              return (
                <SaleCard
                  product={product?.name || ''}
                  productIcon={product?.icon || 'sale'}
                  productColor={product?.color || ''}
                  value={item.value}
                  amount={item.amount}
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

  content: {
    flex: 1,
    gap: 24,
  },

  title: {
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: theme.colors.gray900,
  },
});
