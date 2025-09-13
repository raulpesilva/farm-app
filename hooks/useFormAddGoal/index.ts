import { ProductItem } from '@/@types/product';
import { dispatchGoals, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useFormAddGoal = () => {
  const router = useRouter();
  const products = useProductsSelect();

  const [title, setTitle] = useState('');
  const [product, setProduct] = useState<Pick<ProductItem, 'id' | 'name'> | null>(null);
  const [target, setTarget] = useState(0);
  const [error, setError] = useState({ title: '', product: '', target: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateGoal = async () => {
    try {
      setLoading(true);
      setError({ title: '', product: '', target: '' });

      if (!title) setError((prev) => ({ ...prev, title: 'Digite o nome' }));
      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!target) setError((prev) => ({ ...prev, target: 'Digite o objetivo' }));
      if (!title || !product || !target) return;

      const tempId = Math.random();
      dispatchGoals((prev) => [
        ...prev,
        {
          id: tempId,
          product_id: product.id,
          title,
          measure: 'quantity',
          type: 'buy',
          value: 0,
          target,
          completed: null,
          notified: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      // addProduct({ title: title, icon: iconElem, color: colorElem, farm_id: 1 }).then((newProduct) => {
      //   dispatchProducts((prev) => [...prev.filter((p) => p.id !== tempId), newProduct]);
      //   setTitle('');
      //   setIcon(undefined);
      //   setColor(undefined);
      // });
      router.navigate('/(tabs)/goals');
    } catch (error: any) {
      console.log('Error creating goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ title: '', product: '', target: '' });
  };

  //  title,
  //   product,
  //   objective,
  //   error,
  //   loading,
  //   setTitle,
  //   setProduct,
  //   setObjective,
  //   products,
  //   handleCreateGoal,
  //   onChange,

  return {
    title,
    product,
    objective: target,
    error,
    loading,
    setTitle,
    setProduct,
    setObjective: setTarget,
    products,
    handleCreateGoal,
    onChange,
  };
};
