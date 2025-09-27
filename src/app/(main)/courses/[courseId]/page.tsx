import { getCachedConfig } from '@/lib/configCache';
import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import PreviewCoursePlayer from '@/components/sections/dashboard/courses/PreviewCoursePlayer';

export default async function CoursePage() {
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PreviewCoursePlayer config={config} />
            </div>

            <div className="lg:col-span-1">
              <CourseContentWidget config={config} courseId="123" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
