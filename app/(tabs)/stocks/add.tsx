import { FormAddStock, Typography } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function StockAdd() {
  return (
    <View style={styles.container}>
      <Typography variant='heading1'>Cadastrar estoque</Typography>
      <FormAddStock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
});
