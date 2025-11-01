import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseForm from '@/components/sections/dashboard/courses/CourseForm';
import ContentManagement from '@/components/sections/dashboard/courses/ContentManagement';
import { fetchCourse } from '@/lib/apiClient';
import { UUID } from 'node:crypto';
import { fetchCourseContent } from '@/lib/apiClient/requests/content';

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
  const content = await fetchCourseContent(courseId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection title={'Course Management'} />

        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <CourseForm course={course} />
            <ContentManagement content={content} courseId={courseId} />
          </div>
        </div>
      </div>
    </div>
  );
}
