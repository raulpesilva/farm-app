import { getNotifications, markNotificationAsRead } from '@/services';
import { dispatchNotifications, useNotificationsSelect } from '@/states';
import { useEffect, useState } from 'react';

export const useNotificationActions = () => {
  const markAsRead = async (id: number) => {
    await markNotificationAsRead(id);
  };

  return { markAsRead };
};

export const useSortedNotifications = () => {
  const notifications = useNotificationsSelect();
  const [loading, setLoading] = useState(notifications.length === 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const notificationsData = await getNotifications();
        dispatchNotifications(notificationsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedNotifications = notifications.slice().sort((a, b) => {
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

  return { sortedNotifications, loading };
};

export const useUnreadNotificationsCount = () => {
  const notifications = useNotificationsSelect();
  if (!notifications?.length) return 0;

  return notifications.filter((notification) => !notification.read).length;
};
