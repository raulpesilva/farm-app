import { useFormAddGoal } from '@/hooks';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Typography } from '../shared';

export const FormAddGoal = () => {
  const {
    title,
    product,
    objective,
    error,
    loading,
    setTitle,
    setProduct,
    setObjective,
    products,
    handleCreateGoal,
    onChange,
  } = useFormAddGoal();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite o nome da meta'
          value={title}
          onChangeText={(value) => onChange(setTitle, value)}
          textContentType='name'
          keyboardType='default'
        />
        {error.title && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.title}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field>

      {/* <Select placeholder='Selecione o produto ' options={products} value={product} onPress={setProduct}>
        {error.product && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.product}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Field>
        <Field.TextInput
          placeholder='Digite o objetivo'
          value={objective}
          onChangeText={(value) => onChange(setObjective, value)}
          textContentType='name'
          keyboardType='default'
        />
        {error.objective && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.objective}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field> */}

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

  successMessage: {
    textAlign: 'center',
  },
});
