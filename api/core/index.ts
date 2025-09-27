import { getToken } from '@/states';
import axios, { AxiosHeaders } from 'axios';

export const coreApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

coreApi.interceptors.request.use((config) => {
  const token = getToken();
  const headers = new AxiosHeaders(config.headers);
  if (token) headers.setAuthorization(token);
  return { ...config, headers };
});
