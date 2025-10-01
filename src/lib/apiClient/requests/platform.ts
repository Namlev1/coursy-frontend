import { PlatformRequest } from '@/types/platform';
import apiClient from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';

export async function postPlatform(
  platformRequest: PlatformRequest
): Promise<void> {
  try {
    await apiClient.post<void>('/api/platforms', platformRequest);
  } catch (error) {
    handleError(error);
  }
}
