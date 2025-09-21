import { resetFarm, resetToken } from '@/states';

export const logout = () => {
  resetToken();
  resetFarm();
};
