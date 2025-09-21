import { Transaction } from '@/@types/transactions';
import { coreApi } from '@/api';
import { getFarm } from '@/states';

type AddStockPayload = Omit<Transaction, 'id' | 'farm_id' | 'created_at' | 'updated_at'>;

export const addStock = async (content: AddStockPayload) => {
  const farm = getFarm();
  if (!farm) throw new Error('Farm not found');
  const payload = {
    product_id: content.product_id,
    quantity: content.quantity,
    type: content.type,
    date: content.date,
  };
  const response = await coreApi.post<Transaction>(`/transactions/${farm.id}`, payload);
  return response.data;
};
