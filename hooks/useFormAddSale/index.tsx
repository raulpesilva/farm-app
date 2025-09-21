import { OptionSelect } from '@/components';
import { addSale } from '@/services';
import { useFarmSelect, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const tabs = [
  { label: 'Valor total', value: 'total' } as const,
  { label: 'Valor por unidade', value: 'unit' } as const,
];

export const useFormAddSale = () => {
  const router = useRouter();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const [product, setProduct] = useState<OptionSelect | undefined>(undefined);
  const [value, setValue] = useState('');
  const [tabActive, setTabActive] = useState(tabs[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState({ product: '', value: '', amount: '', date: '' });
  const [loading, setLoading] = useState(false);
  const farm = useFarmSelect();

  const handleCreateSale = async () => {
    try {
      setLoading(true);
      setError({ product: '', value: '', amount: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!value) setError((prev) => ({ ...prev, value: 'Digite a quantidade' }));
      if (!amount) setError((prev) => ({ ...prev, amount: 'Digite o valor' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !value || !amount || !date || !farm) return;

      const valueFormatted = Number(value.replace(/[^\d,-]/g, '').replace(',', '.'));

      const amountFormatted =
        tabActive.value === 'total'
          ? Number(amount.replace(/[^\d,-]/g, '').replace(',', '.'))
          : Number(amount.replace(/[^\d,-]/g, '').replace(',', '.')) * Number(value);

      await addSale({
        farm_id: farm.id,
        product_id: Number(product.type),
        price: valueFormatted,
        quantity: amountFormatted,
        total_price: valueFormatted * amountFormatted,
        date: date.toISOString(),
      });

      setProduct(undefined);
      setValue('');
      setAmount('');
      setDate(undefined);

      if (router.canGoBack()) router.back();
      else router.navigate('/(tabs)/sales');
    } catch (error: any) {
      console.log('Error creating sale:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ product: '', value: '', amount: '', date: '' });
  };

  return {
    tabs,
    products,
    product,
    value,
    tabActive,
    amount,
    date,
    error,
    loading,
    setProduct,
    setValue,
    setTabActive,
    setAmount,
    setDate,
    handleCreateSale,
    onChange,
  };
};
