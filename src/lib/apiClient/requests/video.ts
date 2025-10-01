import { UUID } from 'node:crypto';
import { Video } from '@/types/video';
import apiClient from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';

export async function fetchVideos(courseId: UUID): Promise<Video[]> {
  try {
    const response = await apiClient.get<Video[]>(
      `/api/videos/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function postVideo(formData: FormData): Promise<void> {
  try {
    await apiClient.post<void>('/api/videos/upload', formData, {
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
    const response = await apiClient.get<Video>(`/api/videos/${videoId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
