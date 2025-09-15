import { NotificationItem } from '@/@types/notification';
import { sleep } from '@/utils';
import { getNotifications } from '../getNotifications';

export const markNotificationAsRead = async (id: number): Promise<NotificationItem | null> => {
  await sleep(150);
  const prev = await getNotifications();

  const notification = prev.find((notification) => notification.id === id);
  if (!notification) return null;

  return { ...notification, read: new Date(), updated_at: new Date() };
};
