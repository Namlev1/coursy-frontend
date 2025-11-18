import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/apiClient/urls';
import { isJwtExpired } from '@/lib/jwt';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('jwt');
      if (token && !isJwtExpired(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          handleLogout();
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        Cookies.set('jwt', newAccessToken, {
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('refreshToken', newRefreshToken, {
          secure: true,
          sameSite: 'strict',
        });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        onRefreshed(newAccessToken);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function handleLogout() {
  Cookies.remove('jwt');
  Cookies.remove('refreshToken');

  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

async function refreshAccessTokenServer(refreshToken: string): Promise<{
  token: string;
  refreshToken: string;
} | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Server refresh token failed:', error);
    return null;
  }
}

export async function getServerApiClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  let token = cookieStore.get('jwt')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if ((!token || isJwtExpired(token)) && refreshToken) {
    const res = await refreshAccessTokenServer(refreshToken);
    token = res?.token;
  }

  const serverClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return serverClient;
}

export async function getApiClient() {
  if (typeof window !== 'undefined') {
    console.log('here');
    return apiClient;
  } else {
    return await getServerApiClient();
  }
}

export default apiClient;