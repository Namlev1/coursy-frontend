import { UserCourse } from '@/types/course';
import { getApiClient } from '@/lib/apiClient/apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { TextContent } from '@/types/textContent';

export async function addText(text: TextContent) {
  try {
    const client = await getApiClient();
    const response = await client.post<UserCourse>('/api/content/texts', text);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
