import { LoginResponse } from '@/types/auth';
import apiClient from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UserResponse } from '@/types/user';

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', {
      email: email.trim(),
      password,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchUserData(token: string): Promise<UserResponse> {
  try {
    const response = await apiClient.get<UserResponse>('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
