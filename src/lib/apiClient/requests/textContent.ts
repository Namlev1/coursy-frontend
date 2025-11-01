import { UserCourse } from '@/types/course';
import { getApiClient } from '@/lib/apiClient/apiClient';
import { handleError } from '@/lib/apiClient/errors';

export async function addText(text: Text) {
  try {
    const client = await getApiClient();
    const response = await client.post<UserCourse>('/api/content/texts', text);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
