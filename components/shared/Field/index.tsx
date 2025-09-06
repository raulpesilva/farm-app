import { theme } from '@/theme';
import React, { Children, isValidElement, ReactNode, useMemo } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextProps, View } from 'react-native';
import { Typography } from '../Typography';

interface LabelProps extends TextProps {
  children: string;
}

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <Typography variant='label' {...props}>
      {children}
    </Typography>
  );
};

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.icon}>{children}</View>;
};

const Input = ({ style, ...props }: TextInputProps) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor={theme.colors.gray200} {...props} />;
};

const FeedbackMessage = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.feedbackMessage}>{children}</View>;
};

const groupElements = (children: ReactNode) => {
  const elements: Record<string, ReactNode[]> = { label: [], feedbackMessage: [], others: [] };

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Label) return elements.label.push(child);
    if (child.type === FeedbackMessage) return elements.feedbackMessage.push(child);
    elements.others.push(child);
  });

  return elements;
};

export const Field = ({ children }: { children: React.ReactNode }) => {
  const { label, feedbackMessage, others } = useMemo(() => groupElements(children), [children]);

  return (
    <View style={styles.container}>
      {label}
      <View style={styles.content}>{others}</View>
      {feedbackMessage}
    </View>
  );
};

Field.Label = Label;
Field.Icon = Icon;
Field.TextInput = Input;
Field.FeedbackMessage = FeedbackMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 6,
  },

  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 20,
  },

  icon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    fontFamily: theme.fontFamilies.inter_400,
    fontSize: 14,
    lineHeight: 17,
    color: theme.colors.white,
  },

  feedbackMessage: {
    width: '100%',
    flexDirection: 'column',
    gap: 6,
  },
});
