import { StockItem } from '@/@types/stock';
import { sleep } from '@/utils';
import { getStocks } from '../getStocks';

type AddStockPayload = Omit<StockItem, 'id' | 'amount' | 'created_at' | 'updated_at'>;

export const addStock = async (payload: AddStockPayload) => {
  await sleep(150);
  const prev = await getStocks();

  return {
    id: prev.length + 1,
    amount: 0,
    created_at: new Date(),
    updated_at: new Date(),
    ...payload,
  };
};
