import { Button, Empty, Typography } from '@/components';
import { useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Goals() {
  const products = useProductsSelect();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {!products?.length && (
        <Empty text='Você ainda não cadastrou nenhum produto?' button='Cadastrar produto' link='/products/add' />
      )}

      {!!products?.length && (
        <View style={styles.content}>
          <Button onPress={() => router.navigate('/goals/add')}>
            <Typography variant='label'>Cadastrar meta</Typography>
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
