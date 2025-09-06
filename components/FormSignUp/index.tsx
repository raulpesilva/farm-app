// import { auth } from '@/FirebaseConfig';
// import { dispatchIsAuthenticated } from '@/states';
import { useRouter } from 'expo-router';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Typography } from '../shared';

const useFormSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) return setError('As senhas não coincidem');
    try {
      setLoading(true);
      if (!email || !password || !confirmPassword) return setError('Preencha todos os campos');
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      // if (user) dispatchIsAuthenticated(true);
    } catch (error: any) {
      console.log('Error creating account:', error);
      if (error.message.includes('auth/invalid-email')) return setError('E-mail inválido');
      if (error.message.includes('auth/weak-password')) return setError('A senha deve ter pelo menos 6 caracteres');
      if (error.message.includes('auth/email-already-in-use')) return setError('E-mail ja cadastrado');
      setError('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError('');
  };

  return {
    email,
    password,
    confirmPassword,
    error,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleCreateAccount,
    onChange,
  };
};

export const FormSignUp = () => {
  const router = useRouter();

  const {
    email,
    password,
    confirmPassword,
    error,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleCreateAccount,
    onChange,
  } = useFormSignUp();

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
          textContentType='oneTimeCode'
          keyboardType='default'
          secureTextEntry
        />
      </Field>
      <Field>
        <Field.TextInput
          placeholder='Confirme sua senha'
          value={confirmPassword}
          onChangeText={(value) => onChange(setConfirmPassword, value)}
          textContentType='oneTimeCode'
          keyboardType='default'
          secureTextEntry
        />
      </Field>

      {!!error && (
        <Typography variant='error' style={styles.errorMessage}>
          {error}
        </Typography>
      )}

      <Button onPress={handleCreateAccount} loading={loading}>
        <Typography>Criar conta</Typography>
      </Button>
      <Button variant='outlined' onPress={router.back} loading={loading}>
        <Typography>Voltar</Typography>
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
