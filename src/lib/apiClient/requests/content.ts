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
