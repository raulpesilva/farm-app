import { COLORS_PRODUCT, ICONS_PRODUCT } from '@/@types/product';
import { useFormAddProduct } from '@/hooks';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Select, Typography } from '../shared';

export const FormAddProduct = () => {
  const { name, icon, color, error, loading, setName, setIcon, setColor, handleCreateProduct, onChange } =
    useFormAddProduct();

  return (
    <View style={styles.container}>
      <Field>
        <Field.TextInput
          placeholder='Digite o nome do produto'
          value={name}
          onChangeText={(value) => onChange(setName, value)}
          textContentType='name'
          keyboardType='default'
        />
        {error.name && (
          <Field.FeedbackMessage>
            <Typography variant='error'>{error.name}</Typography>
          </Field.FeedbackMessage>
        )}
      </Field>

      <Select placeholder='Selecione o ícone' options={ICONS_PRODUCT} value={icon} onPress={setIcon}>
        {error.icon && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.icon}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Select placeholder='Selecione a cor' options={COLORS_PRODUCT} value={color} onPress={setColor}>
        {error.color && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.color}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Button onPress={handleCreateProduct} loading={loading}>
        <Typography variant='label'>Cadastrar produto</Typography>
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
