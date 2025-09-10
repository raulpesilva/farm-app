import { ColorOptionSelect, COLORS_PRODUCT, IconOptionSelect, ICONS_PRODUCT } from '@/@types/product';
import { addProduct } from '@/services';
import { dispatchProducts } from '@/states/products';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Field, Select, Typography } from '../shared';

const useFormAddProduct = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<IconOptionSelect | undefined>();
  const [color, setColor] = useState<ColorOptionSelect | undefined>();
  const [error, setError] = useState({ name: '', icon: '', color: '' });
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);

      setError({ name: '', icon: '', color: '' });
      setSuccess('');
      const i = icon?.icon;
      const c = color?.color;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome do produto' }));
      if (!i) setError((prev) => ({ ...prev, icon: 'Selecione um ícone para o produto' }));
      if (!c) setError((prev) => ({ ...prev, color: 'Selecione uma cor para o produto' }));
      if (!name || !i || !c) return;

      // const userFarm = await createFarm(auth, farm);
      // if (userFarm) dispatchHasFarm(true);
      const tempId = Math.random();
      dispatchProducts((prev) => [
        ...prev,
        {
          id: tempId,
          farm_id: 1,
          name,
          icon: i,
          color: c,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      addProduct({ name, icon: i, color: c, farm_id: 1 }).then((newProduct) => {
        dispatchProducts((prev) => [...prev.filter((p) => p.id !== tempId), newProduct]);
        setSuccess('Produto cadastrado com sucesso');
      });
      router.navigate('/(tabs)/products');
    } catch (error: any) {
      console.log('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ name: '', icon: '', color: '' });
    setSuccess('');
  };

  return {
    name,
    icon,
    color,
    error,
    success,
    loading,
    setName,
    setIcon,
    setColor,
    handleCreateProduct,
    onChange,
  };
};

export const FormAddProduct = () => {
  const { name, icon, color, error, success, loading, setName, setIcon, setColor, handleCreateProduct, onChange } =
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

      <Select placeholder='Selecione um ícone para o produto' options={ICONS_PRODUCT} value={icon} onPress={setIcon}>
        {error.icon && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.icon}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Select placeholder='Selecione uma cor para o produto' options={COLORS_PRODUCT} value={color} onPress={setColor}>
        {error.color && (
          <Select.FeedbackMessage>
            <Typography variant='error'>{error.color}</Typography>
          </Select.FeedbackMessage>
        )}
      </Select>

      <Button onPress={handleCreateProduct} loading={loading}>
        <Typography>Salvar</Typography>
      </Button>

      {!!success && (
        <Typography variant='success' style={styles.successMessage}>
          {success}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  successMessage: {
    textAlign: 'center',
  },
});
