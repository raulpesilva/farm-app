import { ProductItem } from '@/@types/product';
import { sleep } from '@/utils';
import { getProducts } from '../getProducts';

type AddProductPayload = Omit<ProductItem, 'id' | 'created_at' | 'updated_at'>;

export const addProduct = async (payload: AddProductPayload) => {
  await sleep(150);
  const prev = await getProducts();
  return { id: prev.length + 1, created_at: new Date(), updated_at: new Date(), ...payload };
};
