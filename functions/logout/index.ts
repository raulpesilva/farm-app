import { dispatchFarm, dispatchToken } from '@/states';

export const logout = () => {
  dispatchToken(null);
  dispatchFarm(null);
};
