import { OptionSelect } from '@/components';
import { addStock } from '@/services';
import { dispatchStocks, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const tabs = [
  { label: 'Comprado', value: 'buy' },
  { label: 'Plantado', value: 'plant' },
  { label: 'Colhido', value: 'harvest' },
] as const;

export const useFormAddStock = () => {
  const router = useRouter();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const [type, setType] = useState<(typeof tabs)[number]>(tabs[0]);
  const [product, setProduct] = useState<OptionSelect | undefined>(undefined);
  const [value, setValue] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [discountPreviousStep, setDiscountPreviousStep] = useState(true);
  const [error, setError] = useState({ product: '', value: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateStock = async () => {
    try {
      setLoading(true);
      setError({ product: '', value: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!value) setError((prev) => ({ ...prev, value: 'Digite a quantidade' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !value || !date) return;

      const valueFormatted = Number(value.replace(/[^\d,-]/g, '').replace(',', '.'));

      const tempId = Math.random();
      dispatchStocks((prev) => [
        ...prev,
        {
          id: tempId,
          farm_id: 1,
          product_id: Number(product.type),
          type: type.value,
          value: valueFormatted,
          amount: 0,
          date,
          created_at: new Date(),
          updated_at: new Date(),
          discountPreviousStep,
        },
      ]);

      addStock({
        farm_id: 1,
        product_id: Number(product.type),
        type: type.value,
        value: valueFormatted,
        date,
        discountPreviousStep,
      })
        .then((newStock) => {
          dispatchStocks((prev) => [...prev.filter((p) => p.id !== tempId), newStock]);
          setProduct(undefined);
          setValue('');
          setDate(undefined);
          setDiscountPreviousStep(true);
        })
        .catch(() => {
          dispatchStocks((prev) => prev.filter((p) => p.id !== tempId));
        });
      router.navigate('/(tabs)/stocks');
    } catch (error: any) {
      console.log('Error creating stock:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ product: '', value: '', date: '' });
  };

  return {
    tabs,
    products,
    type,
    product,
    value,
    date,
    discountPreviousStep,
    error,
    loading,
    setType,
    setProduct,
    setValue,
    setDate,
    setDiscountPreviousStep,
    handleCreateStock,
    onChange,
  };
};
