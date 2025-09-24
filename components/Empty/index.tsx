import { LinkProps, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Typography } from '../shared';

interface EmptyProps {
  text: string;
  button: string;
  link: LinkProps['href'];
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
      <Button
        style={styles.button}
        onPress={() => {
          // Workaround to avoid navigation issues on Expo Router
          if (typeof link === 'string' && link.includes('products/add'))
            router.navigate(link.replace('/add', '') as LinkProps['href']);
          setTimeout(() => router.navigate(link), 0);
        }}
      >
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
