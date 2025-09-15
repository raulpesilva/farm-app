import { ColorOptionSelect, COLORS_PRODUCT, IconOptionSelect, ICONS_PRODUCT } from '@/@types/product';
import { deleteProduct, updateProduct } from '@/services';
import { dispatchProducts, useProductsSelect } from '@/states';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

export const useFormEditProduct = (id: number) => {
  const router = useRouter();
  const products = useProductsSelect();

  const product = useMemo(() => {
    if (!id) return null;
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  }, [id, products]);

  const [name, setName] = useState(product?.name ?? '');
  const [icon, setIcon] = useState<IconOptionSelect | undefined>(
    product?.icon ? ICONS_PRODUCT.find((i) => i.icon === product.icon) : undefined
  );
  const [color, setColor] = useState<ColorOptionSelect | undefined>(
    product?.color ? COLORS_PRODUCT.find((c) => c.color === product.color) : undefined
  );
  const [error, setError] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const edited = product?.name !== name || product?.icon !== icon?.icon || product?.color !== color?.color;

  const handleUpdateProduct = () => {
    try {
      setLoading(true);
      setError({ name: '' });

      const iconElem = icon?.icon;
      const colorElem = color?.color;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!name || !iconElem || !colorElem) return;
      if (!product) return;

      const updatedProduct = {
        ...product,
        name,
        icon: iconElem,
        color: colorElem,
        updated_at: new Date(),
      };

      dispatchProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));

      updateProduct(id, { name, icon: iconElem, color: colorElem }).catch(() => {
        dispatchProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
      });
      router.navigate('/(tabs)/products');
    } catch (error: any) {
      console.log('Error editing product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;
    try {
      setLoading(true);
      dispatchProducts((prev) => prev.filter((p) => p.id !== id));

      deleteProduct(id).catch(() => {
        dispatchProducts((prev) => [...prev, product]);
      });
      router.navigate('/(tabs)/products');
    } catch (error: any) {
      console.log('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setValue(value);
    setError({ name: '' });
  };

  return {
    name,
    icon,
    color,
    error,
    loading,
    edited,
    setName,
    setIcon,
    setColor,
    handleDeleteProduct,
    handleUpdateProduct,
    onChange,
  };
};
