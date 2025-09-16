import { FormAddSale, KeyboardAvoiding, Typography } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function SalesAdd() {
  return (
    <KeyboardAvoiding>
      <View style={styles.container}>
        <Typography variant='heading1'>Cadastrar venda</Typography>
        <FormAddSale />
      </View>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },
});
