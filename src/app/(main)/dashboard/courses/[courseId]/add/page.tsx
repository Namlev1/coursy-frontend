import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseForm from '@/components/sections/dashboard/courses/CourseForm';
import { getCachedConfig } from '@/lib/configCache';
import { Course } from '@/types/course';

export default async function AddVideoPage() {
  const config = await getCachedConfig();
  const course: Course = {
    id: 'df63b781-d0ba-4a77-abcb-cd66c86e4a2a',
    name: '',
    description: '',
    imageUrl: '',
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection title={'Course Management'} config={config} />

        <div className="mx-auto w-full">
          {/* TODO implement the add episode form instead of this random component. */}
          <CourseForm config={config} course={course} />
        </div>
      </div>
    </div>
  );
}
