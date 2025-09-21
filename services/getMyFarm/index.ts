import { Farm } from '@/@types/farm';
import { coreApi } from '@/api';

export const getMyFarm = async () => {
  const response = await coreApi.get<Farm>('/farm');
  console.log({ response });
  return response.data;
};
