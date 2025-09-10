import { NotificationItem } from '@/@types/notification';
import { createReStateMethods } from '@raulpesilva/re-state';

const NOTIFICATIONS_KEY = 'notifications';
const initialValue: NotificationItem[] = [
  {
    id: 1,
    read: null,
    type: 'quantity',
    content: { title: 'Meta 1', product: 'Produto 1' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 3', product: 'Produto 3' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    read: null,
    type: 'amount',
    content: { title: 'Meta 2', product: 'Produto 2' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 4', product: 'Produto 4' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 5', product: 'Produto 5' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 6', product: 'Produto 6' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 7,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 7', product: 'Produto 7' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 8,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 8', product: 'Produto 8' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 9,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 9', product: 'Produto 9' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 10,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 10', product: 'Produto 10' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 11,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 11', product: 'Produto 11' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 12,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 12', product: 'Produto 12' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 13,
    read: new Date(),
    type: 'quantity',
    content: { title: 'Meta 13', product: 'Produto 13' },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 14,
    read: new Date(),
    type: 'amount',
    content: { title: 'Meta 14', product: 'Produto 14' },
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const methods = createReStateMethods(NOTIFICATIONS_KEY, initialValue);

export const { dispatchNotifications, useNotificationsSelect } = methods;
