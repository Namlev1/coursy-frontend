import { PlatformRequest, PlatformResponse } from '@/types/platform';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UUID } from 'node:crypto';

export async function postPlatform(
  platformRequest: PlatformRequest,
  logoFile: File,
  heroFile: File
): Promise<PlatformResponse> {
  try {
    const client = await getApiClient();

    const formData = new FormData();

    formData.append(
      'data',
      new Blob([JSON.stringify(platformRequest)], {
        type: 'application/json',
      })
    );

    formData.append('logo', logoFile);
    formData.append('hero', heroFile);

    const response = await client.post<PlatformResponse>(
      '/api/platforms',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserPlatforms(): Promise<PlatformResponse[]> {
  try {
    const client = await getApiClient();
    const response = await client.get<PlatformResponse[]>('/api/platforms');
    return response.data;
  } catch (error) {
    console.log('here');
    handleError(error);
  }
}

export async function getPlatformById(id: UUID): Promise<PlatformResponse> {
  try {
    const client = await getApiClient();
    const response = await client.get<PlatformResponse>(`/api/platforms/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
