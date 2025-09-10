import { theme } from '@/theme';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Icon, ICON_MAP } from '../Icon';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  contained: {
    backgroundColor: theme.colors.primary,
  },
  outlined: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  canceled: {
    borderColor: theme.colors.gray200,
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.6,
  },

  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const variants = {
  contained: [styles.contained],
  outlined: [styles.outlined],
  error: [styles.error],
  canceled: [styles.canceled],
};

const variantsText: Record<`${keyof typeof variants}Text`, TextStyle> = {
  containedText: { color: theme.colors.gray50 },
  outlinedText: { color: theme.colors.primary },
  errorText: { color: theme.colors.error },
  canceledText: { color: theme.colors.gray200 },
};

interface ButtonProps extends TouchableOpacityProps {
  icon: keyof typeof ICON_MAP;
  variant?: keyof typeof variants;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export const ButtonIcon = ({ icon, variant, style, disabled, loading, ...props }: ButtonProps) => {
  const text = variant && variantsText[`${variant}Text`];

  return (
    <TouchableOpacity
      style={[styles.container, variant && variants[variant], disabled && styles.disabled, style]}
      disabled={disabled || loading}
      activeOpacity={0.6}
      {...props}
    >
      {loading ? <ActivityIndicator size='small' color={text?.color} /> : <Icon type={icon} />}
    </TouchableOpacity>
  );
};
