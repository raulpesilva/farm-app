import { GoalItem } from '@/@types/goal';
import { sleep } from '@/utils';
import { getGoals } from '../getGoals';

type AddGoalPayload = Omit<GoalItem, 'id' | 'value' | 'completed' | 'notified' | 'created_at' | 'updated_at'>;

export const addGoal = async (payload: AddGoalPayload) => {
  await sleep(150);
  const prev = await getGoals();
  return {
    id: prev.length + 1,
    value: 0,
    completed: null,
    notified: null,
    created_at: new Date(),
    updated_at: new Date(),
    ...payload,
  };
};
