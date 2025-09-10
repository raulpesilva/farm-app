import { dispatchNotifications, useNotificationsSelect } from '@/states/notifications';

export const useNotificationActions = () => {
  const notifications = useNotificationsSelect();

  const markAsRead = (id: number) => {
    const updated = notifications.map((notification) =>
      !notification.read && notification.id === id
        ? { ...notification, read: new Date(), updated_at: new Date() }
        : notification
    );
    dispatchNotifications(updated);
  };

  return { markAsRead };
};

export const useSortedNotifications = () => {
  const notifications = useNotificationsSelect();
  if (!notifications?.length) return [];

  return notifications.slice().sort((a, b) => {
    if (a.read === null && b.read !== null) return -1;
    if (a.read !== null && b.read === null) return 1;

    if (a.read === null && b.read === null) {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }

    if (a.read && b.read) {
      return new Date(b.read).getTime() - new Date(a.read).getTime();
    }

    return 0;
  });
};

export const useUnreadNotificationsCount = () => {
  const notifications = useNotificationsSelect();
  if (!notifications?.length) return 0;

  return notifications.filter((notification) => notification.read === null).length;
};
