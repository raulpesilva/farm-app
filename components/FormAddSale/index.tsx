import { useFormAddSale } from '@/hooks';
import { theme } from '@/theme';
import { maskCurrency } from '@/utils';
import { StyleSheet, View } from 'react-native';
import { Button, DatePicker, Field, Select, Typography } from '../shared';
import { TabItem } from '../TabItem';

export const FormAddSale = () => {
  const {
    tabs,
    products,
    product,
    value,
    tabActive,
    amount,
    date,
    error,
    loading,
    setProduct,
    setValue,
    setTabActive,
    setAmount,
    setDate,
    handleCreateSale,
    onChange,
  } = useFormAddSale();

  return (
    <View style={styles.container}>
      <Select placeholder='Selecione o produto' options={products} value={product} onPress={setProduct}>
        {error.product && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.product}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Field>
        <Field.TextInput
          placeholder='Digite a quantidade'
          value={value}
          keyboardType='numeric'
          onChangeText={(value) => onChange(setValue, value)}
        />
        {error.value && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.value}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field>

      <View style={[styles.tabsContainer, error.amount && styles.tabsError]}>
        <View style={styles.tabsContent}>
          {tabs.map((tab) => (
            <TabItem key={tab.value} item={tab} active={tabActive} setActive={() => setTabActive(tab)} />
          ))}
        </View>

        <Field>
          <Field.TextInput
            placeholder={tabActive.value === 'total' ? 'Digite o valor total' : 'Digite o valor por unidade'}
            value={amount}
            keyboardType='numeric'
            onChangeText={(valueInput) => {
              const formatted = maskCurrency(valueInput);
              onChange(setAmount, formatted);
            }}
          />
          {error.amount && (
            <Field.FeedbackMessage>
              <Typography variant='error'>{error.amount}</Typography>
            </Field.FeedbackMessage>
          )}
        </Field>
      </View>

      <DatePicker placeholder='Selecione a data' date={date} setDate={setDate} error={error.date} />

      <Button onPress={handleCreateSale} loading={loading}>
        <Typography variant='label'>Cadastrar venda</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 8,
  },

  tabsContainer: {
    gap: 8,
    minHeight: 88,
  },

  tabsError: {
    minHeight: 109,
  },

  tabsContent: {
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },
});
