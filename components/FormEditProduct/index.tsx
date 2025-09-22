import { COLORS_PRODUCT, ICONS_PRODUCT } from '@/@types/product';
import { useFormEditProduct } from '@/hooks';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Icon, Select, Typography } from '../shared';

interface FormEditProductProps {
  id: number;
}

export const FormEditProduct = ({ id }: FormEditProductProps) => {
  const {
    name,
    icon,
    color,
    error,
    loading,
    edited,
    setName,
    setIcon,
    setColor,
    onChange,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useFormEditProduct(id);

  return (
    <View style={styles.container}>
      <Field style={styles.field}>
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

      <Select placeholder='Selecione o ícone' options={ICONS_PRODUCT} value={icon} onPress={setIcon} />
      <Select placeholder='Selecione a cor' options={COLORS_PRODUCT} value={color} onPress={setColor} />
      {edited && (
        <Button variant='contained' onPress={handleUpdateProduct} loading={loading} style={styles.button}>
          <Icon type='edit' />
          <Typography variant='label'>Salvar alterações</Typography>
        </Button>
      )}
      {!edited && (
        <Button variant='error' onPress={handleDeleteProduct} loading={loading} style={styles.button}>
          <Icon type='trash' />
          <Typography variant='label'>Excluir produto</Typography>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    gap: 8,
    alignItems: 'flex-end',
  },

  field: {
    marginTop: 8,
  },

  button: {
    width: '100%',
  },
});
