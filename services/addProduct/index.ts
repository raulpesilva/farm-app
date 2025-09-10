import { ProductItem } from '@/@types/product';
import { getProducts } from '@/states/products';

type AddProductPayload = Omit<ProductItem, 'id' | 'created_at' | 'updated_at'>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addProduct = async (payload: AddProductPayload) => {
  const prev = getProducts();
  await sleep(2000);
  return {
    id: prev.length + 1,
    created_at: new Date(),
    updated_at: new Date(),
    ...payload,
  };
};
