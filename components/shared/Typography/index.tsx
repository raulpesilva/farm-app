import { theme } from '@/theme';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.gray50,
  },

  sizeXs: {
    fontSize: 12,
    lineHeight: 15,
  },
  sizeSm: {
    fontSize: 14,
    lineHeight: 17,
  },
  sizeBase: {
    fontSize: 16,
    lineHeight: 19,
  },
  sizeLg: {
    fontSize: 18,
    lineHeight: 22,
  },
  sizeXl: {
    fontSize: 20,
    lineHeight: 24,
  },
  size2xl: {
    fontSize: 24,
    lineHeight: 29,
  },

  regular: {
    fontFamily: theme.fontFamilies.inter_400,
  },
  medium: {
    fontFamily: theme.fontFamilies.inter_500,
  },
});

const variants = {
  heading1: [styles.medium, styles.sizeLg],
  heading2: [styles.medium, styles.sizeBase],
  heading3: [styles.medium, styles.sizeSm],
  heading4: [styles.medium, styles.sizeXs],
  paragraph: [styles.regular, styles.sizeXs],
  label: [styles.medium, styles.sizeXs],
  span: [styles.regular, styles.sizeXs],
  error: [styles.regular, styles.sizeXs, { color: theme.colors.error }],
  success: [styles.regular, styles.sizeXs, { color: theme.colors.success }],
};

interface TypographyProps extends TextProps {
  children: string | string[];
  variant?: keyof typeof variants;
  style?: StyleProp<TextStyle>;
}

export const Typography = ({ children, variant = 'paragraph', style, ...props }: TypographyProps) => {
  return (
    <Text style={[styles.text, variants[variant], style]} {...props}>
      {children}
    </Text>
  );
};
