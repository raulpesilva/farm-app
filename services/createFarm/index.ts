import { Farm } from '@/@types/farm';
import { coreApi } from '@/api';

type CreateFarmPayload = Omit<Farm, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export const createFarm = async (content: CreateFarmPayload) => {
  const payload = {
    name: content.name,
  };
  const response = await coreApi.post<Farm>('/farm', payload);
  return response.data;
};
