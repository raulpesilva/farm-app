import { ProductItem } from '@/@types/product';
import { getProducts } from '@/states';
import { sleep } from '@/utils';

type UpdateProductPayload = Omit<ProductItem, 'id' | 'created_at' | 'updated_at' | 'farm_id'>;

export const updateProduct = async (id: number, payload: UpdateProductPayload) => {
  const prev = getProducts();

  await sleep(2000);

  return prev.map((product) => (product.id === id ? { ...product, ...payload, updated_at: new Date() } : product));
};
