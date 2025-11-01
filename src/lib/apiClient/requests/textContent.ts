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

export async function updateText(text: TextContent) {
  try {
    const client = await getApiClient();
    const response = await client.put<UserCourse>('/api/content/texts', text);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchTextContent(textId: string) {
  try {
    const client = await getApiClient();
    const response = await client.get<TextContent>(
      `/api/content/texts/${textId}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}