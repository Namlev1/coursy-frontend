import { Course, UserCourse } from '@/types/course';
import { getApiClient } from '../apiClient';
import { handleError } from '@/lib/apiClient/errors';
import { UUID } from 'node:crypto';
import { AxiosError } from 'axios';

export async function fetchCourse(courseId: string): Promise<Course> {
  try {
    const client = await getApiClient();
    const response = await client.get<Course>(`/api/courses/${courseId}`);
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
    const client = await getApiClient();
    const response = await client.get(`/api/courses/page/${platformId}`, {
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
  imageFile: File
): Promise<Course> {
  try {
    const client = await getApiClient();
    const formData = new FormData();

    formData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            name: name.trim(),
            description: description.trim(),
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    formData.append('image', imageFile);

    const response = await client.post<Course>('/api/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchCurrentUserCourseByCourse(
  courseId: UUID
): Promise<UserCourse | null> {
  try {
    const client = await getApiClient();
    const response = await client.get(
      `/api/courses/user-courses/me/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 404) {
      return null;
    }
    handleError(error);
  }
}

export async function fetchCurrentUserCourses(): Promise<UserCourse[]> {
  try {
    const client = await getApiClient();
    const response = await client.get('/api/courses/user-courses/me');
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function addCourseToUser(userCourse: UserCourse) {
  try {
    const client = await getApiClient();
    const response = await client.post<UserCourse>(
      '/api/courses/user-courses',
      userCourse
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserCourse(
  userCourseId: UUID,
  userCourse: UserCourse
) {
  try {
    const client = await getApiClient();
    const response = await client.put<UserCourse>(
      `/api/courses/user-courses/${userCourseId}`,
      userCourse
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}