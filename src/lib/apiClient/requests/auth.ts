import { LoginResponse } from '@/types/auth';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UserResponse } from '@/types/user';

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const client = await getApiClient();
    const response = await client.post<LoginResponse>('/api/auth/login', {
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
    const client = await getApiClient();
    const response = await client.get<UserResponse>('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
