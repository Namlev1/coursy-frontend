import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseForm from '@/components/sections/dashboard/courses/CourseForm';
import VideosManagement from '@/components/sections/dashboard/courses/VideosManagement';
import { fetchCourse, fetchVideos } from '@/lib/apiClient';
import { UUID } from 'node:crypto';

interface CourseManagementPageProps {
  params: {
    courseId: UUID;
  };
}

export default async function CourseManagementPage({
  params,
}: CourseManagementPageProps) {
  const { courseId } = params;
  const course = await fetchCourse(courseId);
  const videos = await fetchVideos(courseId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection title={'Course Management'} />

        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <CourseForm course={course} />
            <VideosManagement videos={videos} courseId={courseId} />
          </div>
        </div>
      </div>
    </div>
  );
}
