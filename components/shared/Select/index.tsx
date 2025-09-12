import { theme } from '@/theme';
import React, { Children, isValidElement, ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Icon, ICON_MAP } from '../Icon';
import { Typography } from '../Typography';

export interface OptionSelect {
  displayName: string;
  type: string;
  icon?: keyof typeof ICON_MAP;
  color?: string;
}

interface SelectProps {
  placeholder: string;
  options: OptionSelect[];
  onPress: (option: OptionSelect) => void;
  value?: OptionSelect;
  disabled?: boolean;
  children?: React.ReactNode;
}

const FeedbackMessage = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.feedbackMessage}>{children}</View>;
};

const groupElements = (children: ReactNode) => {
  const elements: Record<string, ReactNode[]> = { feedbackMessage: [], others: [] };

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === FeedbackMessage) return elements.feedbackMessage.push(child);
    elements.others.push(child);
  });

  return elements;
};

export const Select = ({ placeholder, options, onPress, value, disabled, children }: SelectProps) => {
  const { feedbackMessage } = useMemo(() => groupElements(children), [children]);

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={options}
        defaultValue={value}
        disabled={disabled}
        onSelect={(selectedItem) => onPress(selectedItem)}
        renderButton={() => (
          <View style={styles.button}>
            {value?.icon && <Icon type={value.icon} color={theme.colors.gray50} />}
            {value?.color && <View style={[styles.color, { backgroundColor: value.color }]} />}
            <Typography
              variant='heading3'
              style={(styles.buttonText, { color: value ? theme.colors.gray50 : theme.colors.gray200 })}
            >
              {!!value?.displayName ? value?.displayName : placeholder}
            </Typography>
          </View>
        )}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={[styles.item, isSelected && { backgroundColor: theme.colors.gray500 }]}>
              {item?.icon && <Icon type={item.icon} color={theme.colors.gray200} />}
              {item?.color && <View style={[styles.color, { backgroundColor: item.color }]} />}
              <Typography style={styles.itemText}>{item?.displayName}</Typography>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.menu}
      />
      {feedbackMessage}
    </View>
  );
};

Select.FeedbackMessage = FeedbackMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 6,
  },

  button: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  buttonText: {
    fontFamily: theme.fontFamilies.inter_400,
  },

  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  itemText: {
    color: theme.colors.gray200,
  },

  color: {
    width: 18,
    height: 18,
    borderRadius: 100,
  },

  menu: {
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
    paddingVertical: 12,
  },

  feedbackMessage: {
    width: '100%',
    flexDirection: 'column',
    gap: 6,
  },
});
