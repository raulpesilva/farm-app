export interface GoalItem {
  id: number;
  product_id: number;
  title: string;
  type: 'quantity' | 'amount';
  value: number;
  target: number;
  completed: Date | null;
  notified: Date | null;
  created_at: Date;
  updated_at: Date;
}

export const TYPE_GOAL: Record<GoalItem['type'], string> = {
  quantity: 'Quantidade',
  amount: 'Valor',
};
