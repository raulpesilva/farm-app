import { theme } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register</Text>
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

  text: {
    color: theme.colors.white,
    fontFamily: theme.fontFamilies.inter_500,
  },
});
