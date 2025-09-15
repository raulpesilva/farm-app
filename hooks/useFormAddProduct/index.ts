import { ColorOptionSelect, IconOptionSelect } from '@/@types/product';
import { addProduct } from '@/services';
import { dispatchProducts } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useFormAddProduct = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<IconOptionSelect | undefined>();
  const [color, setColor] = useState<ColorOptionSelect | undefined>();
  const [error, setError] = useState({ name: '', icon: '', color: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      setError({ name: '', icon: '', color: '' });

      const iconElem = icon?.icon;
      const colorElem = color?.color;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!iconElem) setError((prev) => ({ ...prev, icon: 'Selecione um ícone' }));
      if (!colorElem) setError((prev) => ({ ...prev, color: 'Selecione uma cor' }));
      if (!name || !iconElem || !colorElem) return;

      const tempId = Math.random();
      dispatchProducts((prev) => [
        ...prev,
        {
          id: tempId,
          farm_id: 1,
          name,
          icon: iconElem,
          color: colorElem,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      addProduct({ name, icon: iconElem, color: colorElem, farm_id: 1 })
        .then((newProduct) => {
          dispatchProducts((prev) => [...prev.filter((p) => p.id !== tempId), newProduct]);
          setName('');
          setIcon(undefined);
          setColor(undefined);
        })
        .catch(() => {
          dispatchProducts((prev) => prev.filter((p) => p.id !== tempId));
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
  };

  return {
    name,
    icon,
    color,
    error,
    loading,
    setName,
    setIcon,
    setColor,
    handleCreateProduct,
    onChange,
  };
};
