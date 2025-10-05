import { UUID } from 'node:crypto';
import { Video } from '@/types/video';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';

export async function fetchVideos(courseId: UUID): Promise<Video[]> {
  try {
    const client = await getApiClient();
    const response = await client.get<Video[]>(
      `/api/videos/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function postVideo(formData: FormData): Promise<void> {
  try {
    const client = await getApiClient();
    await client.post<void>('/api/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    handleError(error);
  }
}
export async function fetchVideo(videoId: UUID): Promise<Video> {
  try {
    const client = await getApiClient();
    const response = await client.get<Video>(`/api/videos/${videoId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
