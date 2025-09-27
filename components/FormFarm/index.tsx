// import { auth } from '@/FirebaseConfig';
// import { signOut } from 'firebase/auth';
import { logout } from '@/functions';
import { createFarm } from '@/services';
import { dispatchFarm } from '@/states';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Typography } from '../shared';

const useFormFarm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateFarm = async () => {
    try {
      if (!name) return setError('Preencha o campo com o nome da fazenda');
      setLoading(true);
      const farm = await createFarm({ name });
      dispatchFarm(farm);
    } catch (error: any) {
      console.log('Error creating farm:', error);
      setError('Farm in failed: ' + error.message);
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  const handleSignOut = () => {
    logout();
  };

  return {
    name,
    error,
    loading,
    setName,
    handleCreateFarm,
    onChange,
    handleSignOut,
  };
};

export const FormFarm = () => {
  const { name, error, loading, setName, handleCreateFarm, onChange, handleSignOut } = useFormFarm();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite o nome da sua fazenda'
          value={name}
          onChangeText={(value) => onChange(setName, value)}
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
        <Typography variant='label'>Cadastrar fazenda</Typography>
      </Button>
      <Button variant='canceled' onPress={handleSignOut} loading={loading}>
        <Typography variant='label'>Trocar de conta</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
    marginTop: 80,
  },

  errorMessage: {
    textAlign: 'center',
  },
});
