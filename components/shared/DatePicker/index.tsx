import { theme } from '@/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../Button';
import { Typography } from '../Typography';

interface DatePickerProps {
  date: Date;
  setDate: (value: Date) => void;
  error: string;
}

export const DatePicker = ({ date, setDate, error }: DatePickerProps) => {
  const isIOS = Platform.OS === 'ios';
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const showPicker = () => {
    if (isIOS && date) setTempDate(date);
    setShow(true);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type !== 'set' || !selectedDate) return setShow(false);
    if (isIOS) return setTempDate(selectedDate);
    setDate(selectedDate);
    setShow(false);
  };

  const handleIOSCancel = () => setShow(false);

  const handleIOSSave = () => {
    setDate(tempDate);
    setShow(false);
  };

  const dateFormatted = date?.toLocaleDateString('pt-BR', { dateStyle: 'full' });

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {
          Keyboard.dismiss();
          showPicker();
        }}
      >
        <Typography style={[styles.text, dateFormatted && styles.textSelected]} variant='heading3'>
          {dateFormatted}
        </Typography>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          textColor={theme.colors.gray200}
          display='spinner'
          mode='date'
          value={isIOS ? tempDate : date ?? new Date()}
          onChange={onChange}
          minimumDate={new Date(1980, 0, 1)}
          locale='pt-BR'
        />
      )}

      {show && isIOS && (
        <View style={styles.buttonsContainer}>
          <View style={styles.option}>
            <Button variant='canceled' onPress={handleIOSCancel}>
              <Typography variant='label'>Cancelar</Typography>
            </Button>
          </View>
          <View style={styles.option}>
            <Button variant='outlined' onPress={handleIOSSave}>
              <Typography variant='label'>Salvar</Typography>
            </Button>
          </View>
        </View>
      )}

      {error && <Typography variant='error'>{error}</Typography>}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },

  text: {
    fontFamily: theme.fontFamilies.inter_400,
    color: theme.colors.gray200,
  },

  textSelected: {
    color: theme.colors.gray50,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },

  option: {
    flex: 1,
  },
});
