import { KeyboardAvoiding, Typography } from '@/components';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function ProductAdd() {
  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <Typography variant='heading1'>Cadastrar produto</Typography>
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    gap: 24,
  },
});
