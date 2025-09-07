import { theme } from '@/theme';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface KeyboardAvoidingProps {
  children: React.ReactNode;
}

export const KeyboardAvoiding = ({ children }: KeyboardAvoidingProps) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior} style={style.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray900,
    paddingHorizontal: 24,
  },
});
