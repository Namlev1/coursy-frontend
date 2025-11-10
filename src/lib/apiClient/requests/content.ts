import { getApiClient } from '@/lib/apiClient/apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UUID } from 'node:crypto';
import { ContentDto } from '@/types/content';

export async function fetchCourseContent(
  courseId: UUID
): Promise<ContentDto[]> {
  try {
    const client = await getApiClient();
    const response = await client.get<ContentDto[]>(
      `/api/content/course/${courseId}`
    );
    return response.data.sort((a, b) => a.position - b.position);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteContent(contentId: UUID): Promise<void> {
  try {
    const client = await getApiClient();
    return await client.delete(`/api/content/${contentId}`);
  } catch (error) {
    handleError(error);
  }
}
