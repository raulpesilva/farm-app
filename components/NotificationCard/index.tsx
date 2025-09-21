import { NotificationItem } from '@/@types/notification';
import { useNotificationActions } from '@/hooks';
import { theme } from '@/theme';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NotificationBellIcon, VeganIcon } from '../icons';
import { Typography } from '../shared';

type NotificationCardProps = Pick<NotificationItem, 'id' | 'type' | 'title' | 'message' | 'read'>;

export const NotificationCard = ({ id, type, title, message, read }: NotificationCardProps) => {
  const { markAsRead } = useNotificationActions();

  return (
    <TouchableOpacity style={styles.container} onPress={() => markAsRead(id)}>
      <View style={styles.iconContent}>
        <VeganIcon color={type === 'goal' ? theme.colors.success : theme.colors.primary} />
      </View>

      <View style={styles.infoContent}>
        <Typography variant='label'>{title}</Typography>
        <Typography style={styles.productName}>{message}</Typography>
      </View>

      {!read && <NotificationBellIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: 12,
    backgroundColor: theme.colors.gray700,
    borderRadius: 8,
  },

  iconContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.gray50,
  },

  infoContent: {
    flex: 1,
    gap: 2,
  },

  productName: {
    color: theme.colors.gray200,
  },
});
