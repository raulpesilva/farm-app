import { useFormAddStock } from '@/hooks';
import { theme } from '@/theme';
import { StyleSheet, Switch, View } from 'react-native';
import { Button, DatePicker, Field, Select, Typography } from '../shared';
import { TabItem } from '../TabItem';

export const FormAddStock = () => {
  const {
    tabs,
    products,
    selectedType,
    product,
    value,
    date,
    discountPreviousStep,
    error,
    loading,
    setSelectedType,
    setProduct,
    setValue,
    setDate,
    setDiscountPreviousStep,
    handleCreateStock,
    onChange,
  } = useFormAddStock();

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TabItem key={tab.label} item={tab} active={selectedType} setActive={() => setSelectedType(tab)} />
        ))}
      </View>

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

      <DatePicker placeholder='Selecione a data' date={date} setDate={setDate} error={error.date} />

      <View style={styles.toggleContainer}>
        <Switch
          trackColor={{ false: theme.colors.gray700, true: theme.colors.gray500 }}
          thumbColor={discountPreviousStep ? theme.colors.primary : theme.colors.gray200}
          ios_backgroundColor={theme.colors.gray700}
          onValueChange={setDiscountPreviousStep}
          value={discountPreviousStep}
        />
        <Typography
          style={styles.toggleText}
          variant='heading3'
          onPress={() => setDiscountPreviousStep(!discountPreviousStep)}
        >
          Descontar da etapa anterior?
        </Typography>
      </View>

      <Button onPress={handleCreateStock} loading={loading}>
        <Typography variant='label'>Cadastrar estoque</Typography>
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
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  toggleText: {
    fontFamily: theme.fontFamilies.inter_400,
    paddingVertical: 8,
    flex: 1,
  },
});
