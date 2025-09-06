import { theme } from '@/theme';
import { Children, cloneElement, isValidElement, ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.icon}>{children}</View>;
};

const groupElements = (children: ReactNode, { variant }: Pick<ButtonProps, 'variant'>) => {
  const elements: Record<string, ReactNode[]> = { others: [] };

  Children.forEach(children, (child, index) => {
    if (!isValidElement(child)) return;
    const style = variant ? variantsText[`${variant}Text`] : undefined;
    elements.others.push(cloneElement(child, { style, key: String(index) } as any));
  });

  return elements;
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  contained: {
    backgroundColor: theme.colors.primary,
  },
  outlined: {
    backgroundColor: theme.colors.gray900,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    paddingHorizontal: 14,
  },
  canceled: {
    backgroundColor: theme.colors.error,
  },
  disabled: {
    opacity: 0.7,
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
  canceled: [styles.canceled],
};

const variantsText: Record<`${keyof typeof variants}Text`, TextStyle> = {
  containedText: { color: theme.colors.white },
  outlinedText: { color: theme.colors.primary },
  canceledText: { color: theme.colors.white },
};

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const Button = ({ children, variant = 'contained', style, disabled, ...props }: ButtonProps) => {
  const { others } = useMemo(() => groupElements(children, { variant }), [children, variant]);

  return (
    <TouchableOpacity
      style={[styles.container, ...variants[variant], disabled && styles.disabled, style]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {disabled ? <ActivityIndicator size='small' color={variantsText[`${variant}Text`].color} /> : others}
    </TouchableOpacity>
  );
};

Button.Icon = Icon;
