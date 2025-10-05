import { PlatformRequest, PlatformResponse } from '@/types/platform';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';

export async function postPlatform(
  platformRequest: PlatformRequest
): Promise<void> {
  try {
    const client = await getApiClient();
    await client.post<void>('/api/platforms', platformRequest);
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
    handleError(error);
  }
}
