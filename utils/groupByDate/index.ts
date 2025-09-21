import { Sale } from '@/@types/transactions';

export const groupByDate = (items: Sale[]) => {
  const groups: Record<string, Sale[]> = {};

  items.forEach((item) => {
    const dateKey = item.date.split('T')[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
  });

  return Object.entries(groups)
    .map(([date, data]) => ({ title: date, data }))
    .sort((a, b) => {
      const [dayA, mouthA, yearA] = a.title.split('/').map(Number);
      const [dayB, mouthB, yearB] = b.title.split('/').map(Number);

      const dateA = new Date(yearA, mouthA - 1, dayA).getTime();
      const dateB = new Date(yearB, mouthB - 1, dayB).getTime();

      return dateB - dateA;
    });
};
