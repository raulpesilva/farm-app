import { FormSignIn, KeyboardAvoiding } from '@/components';
import { LogoIcon } from '@/components/icons';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Login() {
  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <LogoIcon />
        <FormSignIn />
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
