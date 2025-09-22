import {
  resetFarm,
  resetGoals,
  resetNotifications,
  resetProducts,
  resetSales,
  resetStocks,
  resetToken,
  resetUser,
} from '@/states';

export const logout = () => {
  resetToken();
  resetFarm();
  resetGoals();
  resetNotifications();
  resetProducts();
  resetSales();
  resetStocks();
  resetUser();
};
