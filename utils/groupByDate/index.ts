import { Sale } from '@/@types/transactions';

export const groupByDate = (items: Sale[]) => {
  const groups: Record<string, Sale[]> = {};

  items.forEach((item) => {
    const dateKey = item.date.split('T')[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
  });
  return Object.entries(groups).map(([date, data]) => ({ title: date, data }));
};
