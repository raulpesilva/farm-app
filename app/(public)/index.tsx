import { Typography } from '@/components/shared';
import { StyleSheet, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Typography>Login</Typography>
    </View>
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
