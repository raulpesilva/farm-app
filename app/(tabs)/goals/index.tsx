import { Button, EmptyProducts, Typography } from '@/components';
import { useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Goals() {
  const products = useProductsSelect();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {!products?.length && <EmptyProducts />}

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
