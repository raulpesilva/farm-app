import { Button, Typography } from '@/components';
import { logout } from '@/functions';
import { useUserSelect } from '@/states';
import { theme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const useAccount = () => {
  const router = useRouter();

  const handleGoBack = () => router.push('/stocks');
  const handleSignOut = () => {
    logout();
  };

  return {
    handleGoBack,
    handleSignOut,
  };
};

export default function Account() {
  const { handleGoBack, handleSignOut } = useAccount();
  const user = useUserSelect();

  return (
    <View style={styles.container}>
      <Typography variant='heading1'>Minha conta</Typography>
      <Typography variant='heading3' style={styles.text1}>
        Seja bem-vindo, {`${user?.name || user?.email}`}!
      </Typography>
      <Typography variant='heading3' style={styles.text2}>
        Página em desenvolvimento. Em breve, novidades por aqui!
      </Typography>

      <View style={styles.actionsContainer}>
        <Button onPress={handleGoBack}>
          <Typography variant='label'>Voltar para o dashboard</Typography>
        </Button>
        <Button variant='canceled' onPress={handleSignOut}>
          <Typography variant='label'>Trocar de conta</Typography>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },

  text1: {
    marginTop: 24,
    fontFamily: theme.fontFamilies.inter_400,
  },

  text2: {
    marginTop: 8,
    fontFamily: theme.fontFamilies.inter_400,
  },

  actionsContainer: {
    gap: 8,
    marginTop: 'auto',
    marginBottom: 24,
  },
});
