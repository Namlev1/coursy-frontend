import { getCachedConfig } from '@/lib/configCache';
import CourseCreationFormSection from '@/components/sections/dashboard/home/CourseCreationFormSection';

export default async function CourseCreationPage() {
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <CourseCreationFormSection config={config} />
      </div>
    </div>
  );
}
