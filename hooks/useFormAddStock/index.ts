import { OptionSelect } from '@/components';
import { addStock } from '@/services';
import { useProductsSelect } from '@/states';
import { onlyNumbersWithDot } from '@/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

const tabs = [
  { label: 'Estoque', value: 'storage' as const },
  { label: 'Plantado', value: 'plant' as const },
  { label: 'Colhido', value: 'harvest' as const },
] as const;

export const useFormAddStock = () => {
  const router = useRouter();
  const { ['product-id']: productId } = useLocalSearchParams<{ 'product-id'?: string }>();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const selectedProduct = products?.find((product) => product.type === productId);

  const [selectedType, setSelectedType] = useState<(typeof tabs)[number]>(tabs[0]);
  const [product, setProduct] = useState<OptionSelect | undefined>(selectedProduct || undefined);
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState({ product: '', quantity: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateStock = async () => {
    try {
      setLoading(true);
      setError({ product: '', quantity: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!quantity) setError((prev) => ({ ...prev, quantity: 'Digite a quantidade' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !quantity || !date) return;

      const formattedQuantity = Number(onlyNumbersWithDot(quantity));

      await addStock({
        product_id: Number(product.type),
        quantity: formattedQuantity,
        date: date.toISOString(),
        type: selectedType.value,
      });

      setProduct(undefined);
      setQuantity('');
      setDate(new Date());
      if (router.canGoBack()) router.back();
      else router.navigate('/(tabs)/stocks');
    } catch (error: any) {
      console.log('Error creating stock:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ product: '', quantity: '', date: '' });
  };

  return {
    tabs,
    products,
    selectedType,
    product,
    quantity,
    date,
    error,
    loading,
    setSelectedType,
    setProduct,
    setQuantity,
    setDate,
    handleCreateStock,
    onChange,
  };
};
