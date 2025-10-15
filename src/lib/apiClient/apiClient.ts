// lib/apiClient/index.ts
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

// Flag żeby uniknąć wielu równoczesnych requestów refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// REQUEST INTERCEPTOR - dodaj token
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

// RESPONSE INTERCEPTOR - obsłuż 401 i refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Jeśli 401 i jeszcze nie próbowaliśmy refreshować
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jeśli już trwa refresh, czekaj na nowy token
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
        const refreshToken = Cookies.get('refreshToken'); // lub localStorage

        if (!refreshToken) {
          // Brak refresh tokenu - wyloguj
          handleLogout();
          return Promise.reject(error);
        }

        // Wywołaj endpoint refresh
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        // Zapisz nowe tokeny
        Cookies.set('jwt', newAccessToken, {
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('refreshToken', newRefreshToken, {
          secure: true,
          sameSite: 'strict',
        });

        // Zaktualizuj header w oryginalnym requeście
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Powiadom wszystkie czekające requesty
        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Ponów oryginalny request
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
  // Redirect do loginu
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

  // Jeśli token wygasł lub nie istnieje, spróbuj odświeżyć
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
    return apiClient;
  } else {
    return await getServerApiClient();
  }
}

export default apiClient;