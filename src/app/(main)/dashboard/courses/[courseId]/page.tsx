import { getCachedConfig } from '@/lib/configCache';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseForm from '@/components/sections/dashboard/courses/CourseForm';
import EpisodesManagement from '@/components/sections/dashboard/courses/EpisodesManagement';

export default async function CourseManagementPage() {
  const config = await getCachedConfig();

  // TODO: fetch course details
  //  Before that, change BE data schema. Course to puki co gołe entity.

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection title={'Course Management'} config={config} />

        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <CourseForm config={config} />
            <EpisodesManagement config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
