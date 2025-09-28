import { getCachedConfig } from '@/lib/configCache';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import { fetchCourse, fetchVideosByCourseId } from '@/api/client';
import CourseSection from '@/components/sections/video/CourseSection';

interface CoursePageProps {
  params: { courseId: string };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const config = await getCachedConfig();
  const courseId = params.courseId;
  const course = await fetchCourse(courseId);
  const videos = await fetchVideosByCourseId(courseId);
  console.log(videos);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <PageHeaderSection title={course.name} config={config} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseSection config={config} videos={videos} />
          </div>
        </main>
      </div>
    </div>
  );
}
