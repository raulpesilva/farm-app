import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';

export const EmptyProducts = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Typography variant='heading1' style={styles.text}>
        Você ainda não cadastrou nenhum produto?
      </Typography>
      <Typography variant='heading2' style={styles.text}>
        Cadastre e comece a gerenciar sua fazenda
      </Typography>
      <Button style={styles.button} onPress={() => router.navigate('/products/add')}>
        <Typography variant='label'>Cadastrar produto</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  text: {
    maxWidth: 288,
    textAlign: 'center',
  },

  button: {
    width: '100%',
  },
});
