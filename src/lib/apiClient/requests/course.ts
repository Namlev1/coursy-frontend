import { Course } from '@/types/course';
import apiClient from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UUID } from 'node:crypto';

export async function fetchCourse(courseId: string): Promise<Course> {
  try {
    const response = await apiClient.get<Course>(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchCourses(
  platformId: UUID,
  page: number = 0,
  pageSize: number = 20
): Promise<Course[]> {
  try {
    const response = await apiClient.get(`/api/courses/page/${platformId}`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });

    return response.data._embedded?.courseResponseList || [];
  } catch (error) {
    handleError(error);
  }
}

export async function createCourse(
  name: string,
  description: string,
  imageUrl: string
) {
  try {
    return await apiClient.post<void>('/api/courses', {
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl,
    });
  } catch (error) {
    handleError(error);
  }
}
