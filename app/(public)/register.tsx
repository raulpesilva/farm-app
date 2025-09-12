import { FormSignUp, KeyboardAvoiding, LogoIcon } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function Register() {
  return (
    <KeyboardAvoiding>
      <View style={styles.container}>
        <LogoIcon />
        <FormSignUp />
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
