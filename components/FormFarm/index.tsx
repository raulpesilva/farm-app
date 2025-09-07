// import { auth } from '@/FirebaseConfig';
// import { signOut } from 'firebase/auth';
import { dispatchHasFarm, dispatchIsAuthenticated } from '@/states';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Typography } from '../shared';

const useFormFarm = () => {
  const [farm, setFarm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateFarm = async () => {
    try {
      setLoading(true);
      if (!farm) return setError('Preencha o campo com o nome da fazenda');
      // const userFarm = await createFarm(auth, farm);
      // if (userFarm) dispatchHasFarm(true);
      dispatchHasFarm(true);
    } catch (error: any) {
      console.log('Error creating farm:', error);
      setError('Farm in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  // const handleSignOut = async () => await signOut(auth);
  const handleSignOut = () => dispatchIsAuthenticated(false);

  return {
    farm,
    error,
    loading,
    setFarm,
    handleCreateFarm,
    onChange,
    handleSignOut,
  };
};

export const FormFarm = () => {
  const { farm, error, loading, setFarm, handleCreateFarm, onChange, handleSignOut } = useFormFarm();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite o nome da sua fazenda'
          value={farm}
          onChangeText={(value) => onChange(setFarm, value)}
          textContentType='name'
          keyboardType='default'
        />
      </Field>

      {!!error && (
        <Typography variant='error' style={styles.errorMessage}>
          {error}
        </Typography>
      )}

      <Button onPress={handleCreateFarm} loading={loading}>
        <Typography>Cadastrar fazenda</Typography>
      </Button>
      <Button variant='canceled' onPress={handleSignOut} loading={loading}>
        <Typography>Sair</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
    marginTop: 80,
  },

  errorMessage: {
    textAlign: 'center',
  },
});
