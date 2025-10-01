import { UUID } from 'node:crypto';
import apiClient from '../apiClient';
import { PlatformConfig } from '@/types/platformConfig';
import { handleError } from '@/lib/apiClient/errors';

export async function fetchConfig(platformId: UUID) {
  try {
    const response = await apiClient.get<PlatformConfig>(
      `/api/platforms/${platformId}/config`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
