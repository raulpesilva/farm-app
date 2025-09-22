import { OptionSelect } from '@/components';
import { addSale } from '@/services';
import { useProductsSelect } from '@/states';
import { formatBRLCurrencyPayload, onlyNumbers, unformatBRLCurrencyInput } from '@/utils';
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
  const [quantity, setQuantity] = useState('');
  const [tabActive, setTabActive] = useState(tabs[0]);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState({ product: '', value: '', price: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateSale = async () => {
    try {
      setLoading(true);
      setError({ product: '', value: '', price: '', date: '' });

      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!quantity) setError((prev) => ({ ...prev, value: 'Digite a quantidade' }));
      if (!price) setError((prev) => ({ ...prev, price: 'Digite o valor' }));
      if (!date) setError((prev) => ({ ...prev, date: 'Selecione a data' }));
      if (!product || !quantity || !price || !date) return;

      const formattedQuantity = Number(onlyNumbers(quantity));

      let pricePayload = formatBRLCurrencyPayload(unformatBRLCurrencyInput(price));
      if (tabActive.value !== 'total') pricePayload *= formattedQuantity;

      await addSale({
        product_id: Number(product.type),
        quantity: formattedQuantity,
        total_price: pricePayload,
        date: date.toISOString(),
      });

      setProduct(undefined);
      setQuantity('');
      setPrice('');
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
    setError({ product: '', value: '', price: '', date: '' });
  };

  return {
    tabs,
    products,
    product,
    quantity,
    tabActive,
    price,
    date,
    error,
    loading,
    setProduct,
    setQuantity,
    setTabActive,
    setPrice,
    setDate,
    handleCreateSale,
    onChange,
  };
};
