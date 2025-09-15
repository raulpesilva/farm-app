import { GOALS_MOCK } from '@/mocks';
import { sleep } from '@/utils';

export const getGoals = async () => {
  await sleep(150);
  return GOALS_MOCK;
};
