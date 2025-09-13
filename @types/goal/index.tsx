import { COLOR_MAP } from '../product';

export interface GoalItem {
  id: number;
  product_id: number;
  title: string;
  measure: 'quantity' | 'amount';
  type: 'buy' | 'plant' | 'harvest' | 'sell';
  value: number;
  target: number;
  completed: Date | null;
  notified: Date | null;
  created_at: Date;
  updated_at: Date;
}

export const MEASURE_GOAL: Record<GoalItem['measure'], string> = {
  quantity: 'Quantidade',
  amount: 'Valor',
};

export const TYPE_GOAL: Record<GoalItem['type'], string> = {
  buy: 'Comprar',
  plant: 'Plantar',
  harvest: 'Colher',
  sell: 'Vender',
};

export const COLORS_GOAL: Record<GoalItem['type'], string> = {
  buy: COLOR_MAP['red'],
  plant: COLOR_MAP['yellow'],
  harvest: COLOR_MAP['blue'],
  sell: COLOR_MAP['green'],
};
