import { SearchIcon } from '@/components/icons';
import { Field, Typography } from '@/components/shared';
import { StyleSheet, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Typography>Login</Typography>

      <Field>
        <Field.Icon>
          <SearchIcon />
        </Field.Icon>
        <Field.Label>Username</Field.Label>
        <Field.TextInput placeholder='Username' />
        <Field.FeedbackMessage>
          <Typography>Feedback message</Typography>
        </Field.FeedbackMessage>
      </Field>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
