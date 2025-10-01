import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseSection from '@/components/sections/video/CourseSection';
import { fetchCourse, fetchVideos } from '@/lib/apiClient';
import { UUID } from 'node:crypto';

interface CoursePageProps {
  params: { courseId: UUID };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = params.courseId;
  const course = await fetchCourse(courseId);
  const videos = await fetchVideos(courseId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <PageHeaderSection title={course.name} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseSection videos={videos} />
          </div>
        </main>
      </div>
    </div>
  );
}
