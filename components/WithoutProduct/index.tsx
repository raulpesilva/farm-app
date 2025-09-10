import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';

export const WithoutProduct = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Typography variant='heading3' style={styles.text}>
        Você ainda não cadastrou nenhum produto
      </Typography>
      <Typography style={styles.text}>Cadastre seus produtos e mantenha tudo organizado em sua fazenda</Typography>
      <Button style={styles.button} onPress={() => router.navigate('/products/add')}>
        <Typography>Cadastrar produto</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },

  text: {
    textAlign: 'center',
  },

  button: {
    marginTop: 32,
  },
});
