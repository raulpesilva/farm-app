import { FormAddProduct, KeyboardAvoiding, Typography } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function ProductAdd() {
  return (
    <KeyboardAvoiding>
      <View style={styles.container}>
        <Typography variant='heading1'>Cadastrar produto</Typography>
        <FormAddProduct />
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
