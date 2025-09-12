import { Typography } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function SalesAdd() {
  return (
    <View style={styles.container}>
      <Typography variant='heading1'>Cadastrar venda</Typography>
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
