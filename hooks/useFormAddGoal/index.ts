import { GoalItem } from '@/@types/goal';
import { OptionSelect } from '@/components';
import { addGoal } from '@/services';
import { dispatchGoals, useFarmSelect, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useFormAddGoal = () => {
  const router = useRouter();
  const productsSelect = useProductsSelect();
  const farm = useFarmSelect();

  const products: OptionSelect[] = productsSelect.map((product) => ({
    displayName: product.name,
    icon: product.icon,
    type: String(product.id),
  }));

  const [name, setName] = useState('');
  const [product, setProduct] = useState<OptionSelect | undefined>(undefined);
  const [target, setTarget] = useState('');
  const [measure, setMeasure] = useState<GoalItem['measure']>('quantity');
  const [type, setType] = useState<GoalItem['type']>('storage');
  const [error, setError] = useState({ name: '', product: '', target: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateGoal = async () => {
    try {
      setLoading(true);
      setError({ name: '', product: '', target: '' });

      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!product) setError((prev) => ({ ...prev, product: 'Selecione um produto' }));
      if (!target) setError((prev) => ({ ...prev, target: 'Digite o objetivo' }));
      if (!name || !product || !target || !farm) return;

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
          farm_id: farm.id,
          name: name,
          measure,
          type,
          value: 0,
          target: targetFormatted,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      addGoal({
        product_id: Number(product.type),
        farm_id: farm.id,
        name,
        measure,
        type,
        target: targetFormatted,
      })
        .then((newGoal) => {
          dispatchGoals((prev) => [...prev.filter((p) => p.id !== tempId), newGoal]);
          setName('');
          setProduct(undefined);
          setTarget('');
          setMeasure('quantity');
          setType('storage');
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
    setError({ name: '', product: '', target: '' });
  };

  return {
    products,
    name,
    product,
    target,
    measure,
    type,
    error,
    loading,
    setName,
    setProduct,
    setTarget,
    setMeasure,
    setType,
    handleCreateGoal,
    onChange,
  };
};
