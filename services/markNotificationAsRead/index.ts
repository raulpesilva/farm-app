import { NotificationItem } from '@/@types/notification';
import { getNotifications } from '@/states/notifications';
import { sleep } from '@/utils';

export const markNotificationAsRead = async (id: number): Promise<NotificationItem | null> => {
  // trocar pela chamada da API
  const prev = getNotifications();
  await sleep(2000);

  const notification = prev.find((notification) => notification.id === id);
  if (!notification) return null;

  return { ...notification, read: new Date(), updated_at: new Date() };
};
