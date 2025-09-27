import { getMyFarm, signIn } from '@/services';
import { dispatchFarm, dispatchToken } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Typography } from '../shared';

const useFormSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) return setError('Preencha todos os campos');
      setLoading(true);
      const response = await signIn({ email, password });
      dispatchToken(response.token);
      try {
        const farm = await getMyFarm();
        dispatchFarm(farm);
      } catch {
        dispatchFarm(null);
        setLoading(false);
      }
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      let message = 'Sign in failed: ' + error.message;
      if (error.response.data.error.includes('email or password is incorrect')) message = 'E-mail ou senha incorretos';
      setError(message);
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  const handleRegister = () => router.navigate('/register');

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleLogin,
    onChange,
    handleRegister,
  };
};

export const FormSignIn = () => {
  const { email, password, error, loading, setEmail, setPassword, handleLogin, onChange, handleRegister } =
    useFormSignIn();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite seu e-mail'
          value={email}
          onChangeText={(value) => onChange(setEmail, value)}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
        />
      </Field>
      <Field>
        <Field.TextInput
          placeholder='Digite sua senha'
          value={password}
          onChangeText={(value) => onChange(setPassword, value)}
          textContentType='password'
          secureTextEntry
        />
      </Field>

      {!!error && (
        <Typography variant='error' style={styles.errorMessage}>
          {error}
        </Typography>
      )}

      <Button onPress={handleLogin} loading={loading}>
        <Typography variant='label'>Entrar</Typography>
      </Button>
      <Button variant='outlined' onPress={handleRegister} loading={loading}>
        <Typography variant='label'>Criar conta</Typography>
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
