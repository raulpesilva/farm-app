import { useFormAddGoal } from '@/hooks';
import { maskCurrency, maskDecimal } from '@/utils';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Select, Typography } from '../shared';
import { TabsGoal } from '../TabsGoal';

export const FormAddGoal = () => {
  const {
    products,
    name,
    product,
    target,
    measure,
    error,
    loading,
    setName,
    setProduct,
    setTarget,
    setMeasure,
    setType,
    handleCreateGoal,
    onChange,
  } = useFormAddGoal();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite o nome da meta'
          value={name}
          onChangeText={(value) => onChange(setName, value)}
        />
        {error.name && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.name}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field>

      <Select placeholder='Selecione o produto' options={products} value={product} onPress={setProduct}>
        {error.product && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.product}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <TabsGoal setMeasure={setMeasure} setType={setType} />

      <Field>
        <Field.TextInput
          placeholder='Digite o objetivo'
          value={target}
          onChangeText={(value) => {
            const formatted = measure === 'quantity' ? maskDecimal(value) : maskCurrency(value);
            onChange(setTarget, formatted);
          }}
          keyboardType='numeric'
        />
        {error.target && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.target}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field>

      <Button onPress={handleCreateGoal} loading={loading}>
        <Typography variant='label'>Cadastrar meta</Typography>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 8,
  },
});
