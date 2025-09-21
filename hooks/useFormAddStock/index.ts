import { OptionSelect } from '@/components';
import { addStock } from '@/services';
import { dispatchTransactions, useFarmSelect, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const tabs = [
  { label: 'Estoque', value: 'storage' as const },
  { label: 'Plantado', value: 'plant' as const },
  { label: 'Colhido', value: 'harvest' as const },
] as const;

export const useFormAddStock = () => {
  const router = useRouter();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const [selectedType, setSelectedType] = useState<(typeof tabs)[number]>(tabs[0]);
  const [product, setProduct] = useState<OptionSelect | undefined>(undefined);
  const [value, setValue] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [discountPreviousStep, setDiscountPreviousStep] = useState(true);
  const [error, setError] = useState({ product: '', value: '', date: '' });
  const [loading, setLoading] = useState(false);
  const farm = useFarmSelect();

  const handleCreateStock = async () => {
    try {
      setLoading(true);
      setError({ product: '', value: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!value) setError((prev) => ({ ...prev, value: 'Digite a quantidade' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !value || !date || !farm) return;

      const valueFormatted = Number(value.replace(/[^\d,-]/g, '').replace(',', '.'));

      const tempId = Math.random();
      dispatchTransactions((prev) => [
        ...prev,
        {
          id: tempId,
          farm_id: farm.id,
          product_id: Number(product.type),
          type: selectedType.value,
          quantity: valueFormatted,
          date: date.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      addStock({
        product_id: Number(product.type),
        quantity: valueFormatted,
        date: date.toISOString(),
        type: selectedType.value,
      })
        .then((newStock) => {
          dispatchTransactions((prev) => [...prev.filter((p) => p.id !== tempId), newStock]);
          setProduct(undefined);
          setValue('');
          setDate(undefined);
          setDiscountPreviousStep(true);
        })
        .catch(() => {
          dispatchTransactions((prev) => prev.filter((p) => p.id !== tempId));
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
  };
};
