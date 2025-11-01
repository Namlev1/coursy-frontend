import { getPlatformId } from '@/lib/headerUtils';
import CourseGridSection from '@/components/sections/courses/CourseGridSection';

export default async function CoursesPage() {
  const platformId = await getPlatformId();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className={'px-8 sm:px-12 lg:px-16'}>
          <CourseGridSection platformId={platformId} />
        </div>
      </div>
    </div>
  );
}
