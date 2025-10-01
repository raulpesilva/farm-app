import { COLORS_PRODUCT, ICONS_PRODUCT } from '@/@types/product';
import { deleteProduct, updateProduct } from '@/services';
import { useProductsSelect } from '@/states';
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
  const [icon, setIcon] = useState(ICONS_PRODUCT.find((i) => i.icon === product?.icon));
  const [color, setColor] = useState(COLORS_PRODUCT.find((c) => c.type === product?.color));
  const [error, setError] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const edited = product?.name !== name || product?.icon !== icon?.icon || product?.color !== color?.type;

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      setError({ name: '' });

      const iconElem = icon?.icon;
      const colorElem = color?.type;
      if (!name) setError((prev) => ({ ...prev, name: 'Digite o nome' }));
      if (!name || !iconElem || !colorElem) return;
      if (!product) return;

      await updateProduct({ name, icon: iconElem, color: colorElem, id });
      if (router.canGoBack()) router.back();
      else router.navigate('/(tabs)/products');
    } catch (error: any) {
      setLoading(false);
      console.log('Error editing product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;
    try {
      setLoading(true);
      await deleteProduct(id);
      if (router.canGoBack()) router.back();
      else router.navigate('/(tabs)/products');
    } catch (error: any) {
      setLoading(false);
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
