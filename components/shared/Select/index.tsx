import { theme } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Typography } from '../Typography';

interface SelectProps {
  placeholder: string;
  options: string[];
  onPress: (option: string) => void;
  value?: string;
}

export const Select = ({ placeholder, options, onPress, value }: SelectProps) => {
  return (
    <SelectDropdown
      data={options}
      defaultValue={value}
      onSelect={(selectedItem) => onPress(selectedItem)}
      renderButton={(selectedItem) => (
        <View style={styles.button}>
          <Text style={(styles.buttonText, { color: selectedItem ? theme.colors.white : theme.colors.gray200 })}>
            {selectedItem || placeholder}
          </Text>
        </View>
      )}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={[styles.item, isSelected && { backgroundColor: theme.colors.gray500 }]}>
            <Typography>{item}</Typography>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.menu}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.gray700,
    borderRadius: 20,
    paddingHorizontal: 12,
  },

  buttonText: {
    fontFamily: theme.fontFamilies.inter_400,
    fontSize: 14,
    lineHeight: 17,
  },

  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  menu: {
    backgroundColor: theme.colors.gray700,
    borderRadius: 20,
    paddingVertical: 12,
  },
});
