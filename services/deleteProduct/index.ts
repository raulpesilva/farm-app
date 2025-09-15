import { sleep } from '@/utils';
import { getProducts } from '../getProducts';

export const deleteProduct = async (id: number) => {
  await sleep(150);
  const prev = await getProducts();
  return prev.filter((product) => product.id !== id);
};
