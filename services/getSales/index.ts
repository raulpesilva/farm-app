import { SALES_MOCK } from '@/mocks';
import { sleep } from '@/utils';

export const getSales = async () => {
  await sleep(150);
  return SALES_MOCK;
};
