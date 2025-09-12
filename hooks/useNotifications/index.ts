import { markNotificationAsRead } from '@/services';
import { dispatchNotifications, useNotificationsSelect } from '@/states';

export const useNotificationActions = () => {
  const markAsRead = (id: number) => {
    const tempId = Math.random();
    const tempDate = new Date();

    dispatchNotifications((prev) => {
      const newNotifications = prev.map((n) => {
        if (n.id === id && !n.read) return { ...n, read: tempDate, updated_at: tempDate, id: tempId };
        return n;
      });
      return newNotifications;
    });

    markNotificationAsRead(id).then((notification) => {
      if (notification) dispatchNotifications((prev) => [...prev.filter((n) => n.id !== tempId), notification]);
    });
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
