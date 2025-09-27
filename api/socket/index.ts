import { getToken } from '@/states';
import { io } from 'socket.io-client';

export const createSocket = () => {
  return io(process.env.EXPO_PUBLIC_WS_URL, {
    extraHeaders: { Authorization: getToken() || '' },
    autoConnect: false,
  });
};
