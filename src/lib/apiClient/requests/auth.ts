import { LoginResponse, RegisterDto } from '@/types/auth';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UserResponse } from '@/types/user';

export async function loginUser(
  email: string,
  password: string,
  platformId: string | null
): Promise<LoginResponse> {
  const client = await getApiClient();
  const response = await client.post<LoginResponse>('/api/auth/login', {
    email: email.trim(),
    password,
    platformId: platformId,
  });
  return response.data;
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

export async function logoutUser() {
  try {
    const client = await getApiClient();
    await client.post<void>('/api/auth/logout');
  } catch (error) {
    handleError(error);
  }
}

export async function registerUser(dto: RegisterDto, platformId?: string) {
  const client = await getApiClient();
  const url = platformId
    ? `/api/users/platform/${platformId}/register`
    : '/api/users/host/register';
  await client.post<void>(url, dto);
}
