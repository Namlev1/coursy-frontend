// lib/apiClient/index.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/apiClient/urls';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Client-side: use js-cookie
    if (typeof window !== 'undefined') {
      const token = Cookies.get('jwt');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getServerApiClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  const serverClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return serverClient;
}

// Universal client that works everywhere
export async function getApiClient() {
  if (typeof window !== 'undefined') {
    // Client-side: use the regular apiClient
    return apiClient;
  } else {
    // Server-side: create a new client with server cookies
    return await getServerApiClient();
  }
}

export default apiClient;