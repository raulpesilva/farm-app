import { GoalItem } from '@/@types/goal';

export const GOALS_MOCK: GoalItem[] = [
  {
    id: 1,
    product_id: 1,
    title: 'Meta 1',
    measure: 'quantity',
    type: 'buy',
    value: 0,
    target: 10,
    completed: null,
    notified: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    product_id: 1,
    title: 'Meta 2',
    measure: 'quantity',
    type: 'sell',
    value: 10,
    target: 10,
    completed: new Date(),
    notified: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
