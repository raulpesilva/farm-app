import { Sale } from '@/@types/transactions';

export const groupByDate = (items: Sale[]) => {
  const groups: Record<string, Sale[]> = {};

  items.forEach((item) => {
    const date = item.date.split('T')[0];
    const [year, month, day] = date.split('-');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    const dateKey = dateObj.toLocaleDateString('pt-BR');

    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
  });
  return Object.entries(groups)
    .map(([date, data]) => ({ title: date, data }))
    .filter((group) => group.data.length > 0);
};
