import { GoalItem } from '@/@types/goal';
import { OptionSelect } from '@/components';
import { addGoal } from '@/services';
import { dispatchGoals, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useFormAddGoal = () => {
  const router = useRouter();
  const productsSelect = useProductsSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const [title, setTitle] = useState('');
  const [product, setProduct] = useState<OptionSelect | undefined>(undefined);
  const [target, setTarget] = useState('');
  const [measure, setMeasure] = useState<GoalItem['measure']>('quantity');
  const [type, setType] = useState<GoalItem['type']>('buy');
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

      const targetFormatted =
        measure === 'quantity'
          ? Number(target.replace(/\D/g, ''))
          : Number(target.replace(/[^\d,-]/g, '').replace(',', '.'));

      const tempId = Math.random();
      dispatchGoals((prev) => [
        ...prev,
        {
          id: tempId,
          product_id: Number(product.type),
          title,
          measure,
          type,
          value: 0,
          target: targetFormatted,
          completed: null,
          notified: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      addGoal({ product_id: Number(product.type), title, measure, type, target: targetFormatted })
        .then((newGoal) => {
          dispatchGoals((prev) => [...prev.filter((p) => p.id !== tempId), newGoal]);
          setTitle('');
          setProduct(undefined);
          setTarget('');
          setMeasure('quantity');
          setType('buy');
        })
        .catch(() => {
          dispatchGoals((prev) => prev.filter((p) => p.id !== tempId));
        });
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

  return {
    products,
    title,
    product,
    target,
    measure,
    type,
    error,
    loading,
    setTitle,
    setProduct,
    setTarget,
    setMeasure,
    setType,
    handleCreateGoal,
    onChange,
  };
};
