import { UUID } from 'node:crypto';
import { getApiClient } from '@/lib/apiClient/apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { PageTemplate } from '@/types/pageTemplate';

export const savePageTemplate = async (dto: PageTemplate, platformId: UUID) => {
  try {
    const client = await getApiClient();
    const response = await client.post<PageTemplate>(
      `/api/platforms/${platformId}/templates`,
      dto
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
