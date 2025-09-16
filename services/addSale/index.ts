import { SaleItem } from '@/@types/sale';
import { sleep } from '@/utils';
import { getSales } from '../getSales';

type AddSalePayload = Omit<SaleItem, 'id' | 'type' | 'created_at' | 'updated_at'>;

export const addSale = async (payload: AddSalePayload) => {
  await sleep(150);
  const prev = await getSales();
  const type: SaleItem['type'] = 'sell';

  return {
    id: prev.length + 1,
    type,
    created_at: new Date(),
    updated_at: new Date(),
    ...payload,
  };
};
