export interface NotificationItem {
  id: number;
  read: Date | null;
  type: 'quantity' | 'amount';
  content: { title: string; product: string };
  created_at: Date;
  updated_at: Date;
}
