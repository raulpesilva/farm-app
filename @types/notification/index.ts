export interface NotificationItem {
  id: number;
  farm_id: number;
  read: string | null;
  type: 'goal';
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}
