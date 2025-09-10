import { FormFarm, KeyboardAvoiding, NotFarmIcon, Typography } from '@/components';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function AddFarm() {
  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <NotFarmIcon />
        <Typography variant='heading1' style={styles.title1}>
          Você ainda não cadastrou nenhuma fazenda?
        </Typography>
        <Typography variant='heading2' style={styles.title2}>
          Cadastre sua fazenda e facilite sua rotina
        </Typography>
        <FormFarm />
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title1: {
    marginTop: 80,
    maxWidth: 288,
    textAlign: 'center',
  },

  title2: {
    marginTop: 8,
    maxWidth: 288,
    textAlign: 'center',
  },
});
