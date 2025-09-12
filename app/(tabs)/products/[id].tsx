import { FormEditProduct, KeyboardAvoiding, Typography } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function ProductDetail() {
  const searchParams = useLocalSearchParams();
  const id = searchParams.id;
  if (!id) return null;

  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <Typography variant='heading1'>Produto</Typography>
        <FormEditProduct id={Number(id)} />
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
});
