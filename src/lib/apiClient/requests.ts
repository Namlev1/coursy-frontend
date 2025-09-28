import { Course } from '@/types/course';
import apiClient from '@/lib/apiClient/apiClient';
import { UUID } from 'node:crypto';
import { Video } from '@/types/video';
import { handleError } from '@/lib/apiClient/errors';
import { PlatformConfig } from '@/types/platformConfig';

export async function fetchCourse(courseId: string): Promise<Course> {
  try {
    const response = await apiClient.get<Course>(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchVideosByCourseId(courseId: UUID): Promise<Video[]> {
  try {
    const response = await apiClient.get<Video[]>(
      `/api/videos/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

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
