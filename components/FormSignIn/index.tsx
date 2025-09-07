// import { auth } from '@/FirebaseConfig';
import { useRouter } from 'expo-router';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { dispatchIsAuthenticated } from '@/states';
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
      setLoading(true);
      if (!email || !password) return setError('Preencha todos os campos');
      // const user = await signInWithEmailAndPassword(auth, email, password);
      // if (user) dispatchIsAuthenticated(true);
      dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error signing in with email and password:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/wrong-password')) return setError('Senha incorreta');
      if (error.message.includes('auth/user-not-found')) return setError('Usuário não encontrado');
      setError('Sign in failed: ' + error.message);
    } finally {
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
        <Typography>Entrar</Typography>
      </Button>
      <Button variant='outlined' onPress={handleRegister} loading={loading}>
        <Typography>Criar conta</Typography>
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
