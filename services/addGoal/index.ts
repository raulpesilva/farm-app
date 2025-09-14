import { GoalItem } from '@/@types/goal';
import { getGoals } from '@/states';
import { sleep } from '@/utils';

type AddGoalPayload = Omit<GoalItem, 'id' | 'value' | 'completed' | 'notified' | 'created_at' | 'updated_at'>;

export const addGoal = async (payload: AddGoalPayload) => {
  const prev = getGoals();

  await sleep(2000);

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
