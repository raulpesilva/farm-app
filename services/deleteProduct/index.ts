import { getProducts } from '@/states';
import { sleep } from '@/utils';

export const deleteProduct = async (id: number) => {
  const prev = getProducts();

  await sleep(2000);

  return prev.filter((product) => product.id !== id);
};
