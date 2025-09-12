import { Href, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';

interface EmptyProps {
  text: string;
  button: string;
  link: Href;
}

export const Empty = ({ text, button, link }: EmptyProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Typography variant='heading1' style={styles.text}>
        {text}
      </Typography>
      <Typography variant='heading2' style={styles.text}>
        Cadastre e comece a gerenciar sua fazenda
      </Typography>
      <Button style={styles.button} onPress={() => router.navigate(link)}>
        <Typography variant='label'>{button}</Typography>
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
