import { StockItem } from '@/@types/stock';

type GroupType = Pick<StockItem, 'id' | 'farm_id' | 'product_id' | 'created_at' | 'updated_at'> & {
  buy: number;
  plant: number;
  harvest: number;
};

export const groupByStock = (stocks: StockItem[]) => {
  const group = stocks.reduce((acc, stock) => {
    const key = stock.product_id;

    if (!acc[key]) {
      acc[key] = {
        id: stock.id,
        farm_id: stock.farm_id,
        product_id: stock.product_id,
        buy: 0,
        plant: 0,
        harvest: 0,
        created_at: stock.created_at,
        updated_at: stock.updated_at,
      };
    }

    acc[key][stock.type] += stock.value;

    return acc;
  }, {} as Record<number, GroupType>);

  return [{ data: Object.values(group) }];
};
