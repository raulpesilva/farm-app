import { FormSignUp, KeyboardAvoiding, LogoIcon } from '@/components';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Register() {
  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <LogoIcon />
        <FormSignUp />
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
