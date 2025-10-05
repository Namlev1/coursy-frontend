import { UUID } from 'node:crypto';
import { getApiClient } from '../apiClient';
import { PlatformConfig } from '@/types/platformConfig';
import { handleError } from '@/lib/apiClient/errors';

export async function fetchConfig(platformId: UUID) {
  try {
    const client = await getApiClient();
    const response = await client.get<PlatformConfig>(
      `/api/platforms/${platformId}/config`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
