import { STOCKS_MOCK } from '@/mocks';
import { sleep } from '@/utils';

export const getStocks = async () => {
  await sleep(150);
  return STOCKS_MOCK;
};
