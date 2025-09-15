import { ProductItem } from '@/@types/product';
import { sleep } from '@/utils';
import { getProducts } from '../getProducts';

type UpdateProductPayload = Omit<ProductItem, 'id' | 'created_at' | 'updated_at' | 'farm_id'>;

export const updateProduct = async (id: number, payload: UpdateProductPayload) => {
  await sleep(150);
  const prev = await getProducts();
  return prev.map((product) => (product.id === id ? { ...product, ...payload, updated_at: new Date() } : product));
};
