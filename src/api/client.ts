import axios from 'axios';
import Cookies from 'js-cookie';
import { ThumbnailSize, ThumbnailType } from '@/types/video';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getVideoThumbnailUrl = (
  videoId: string,
  size: ThumbnailSize = ThumbnailSize.SMALL,
  type?: ThumbnailType
): string => {
  const baseUrl = `${API_BASE_URL}/api/videos/${videoId}/thumbnail`;
  const params = new URLSearchParams();

  params.set('size', size.toString());

  if (type !== undefined) {
    params.set('type', type.toString());
  }

  return `${baseUrl}?${params.toString()}`;
};

export default apiClient;
