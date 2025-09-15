import { NOTIFICATIONS_MOCK } from '@/mocks';
import { sleep } from '@/utils';

export const getNotifications = async () => {
  await sleep(150);
  return NOTIFICATIONS_MOCK;
};
