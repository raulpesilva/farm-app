import { PRODUCTS_MOCK } from '@/mocks';
import { sleep } from '@/utils';

export const getProducts = async () => {
  await sleep(150);
  return PRODUCTS_MOCK;
};
