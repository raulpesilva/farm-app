import { Typography } from '@/components';
import { StyleSheet, View } from 'react-native';

export default function GoalAdd() {
  return (
    <View style={styles.container}>
      <Typography variant='heading1'>Cadastrar meta</Typography>
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
