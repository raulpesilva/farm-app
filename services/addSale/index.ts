import { Sale } from '@/@types/transactions';
import { sleep } from '@/utils';
import { getSales } from '../getSales';

type AddSalePayload = Omit<Sale, 'id' | 'type' | 'created_at' | 'updated_at'>;

export const addSale = async (payload: AddSalePayload) => {
  await sleep(150);
  const prev = await getSales();
  const type: Sale['type'] = 'sale';

  return {
    id: prev.length + 1,
    type,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...payload,
  };
};
