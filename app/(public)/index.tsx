import { FormSignIn, KeyboardAvoiding, LogoIcon } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function Login() {
  return (
    <KeyboardAvoiding>
      <View style={styles.container}>
        <LogoIcon />
        <FormSignIn />
      </View>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
