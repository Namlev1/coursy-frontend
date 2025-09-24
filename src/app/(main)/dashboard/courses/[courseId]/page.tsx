import { getCachedConfig } from '@/lib/configCache';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseForm from '@/components/sections/dashboard/courses/CourseForm';
import VideosManagement from '@/components/sections/dashboard/courses/VideosManagement';
import apiClient from '@/api/client';
import { Course } from '@/types/course';
import { Video } from '@/types/video';

interface CourseManagementPageProps {
  params: {
    courseId: string;
  };
}

async function fetchCourse(courseId: string): Promise<Course> {
  try {
    const response = await apiClient.get<Course>(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchVideos(courseId: string): Promise<Video[]> {
  try {
    const response = await apiClient.get<Video[]>(
      `/api/videos/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default async function CourseManagementPage({
  params,
}: CourseManagementPageProps) {
  const config = await getCachedConfig();

  const { courseId } = params;
  const course = await fetchCourse(courseId);
  const videos = await fetchVideos(courseId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection title={'Course Management'} config={config} />

        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <CourseForm config={config} course={course} />
            <VideosManagement config={config} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
}
