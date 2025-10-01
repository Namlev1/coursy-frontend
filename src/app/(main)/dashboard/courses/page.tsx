import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseTable from '@/components/sections/dashboard/courses/CourseTable';
import { getPlatformId } from '@/lib/headerUtils';
import { fetchCourses } from '@/lib/apiClient';

export default async function CoursesDashboardPage() {
  const platformId = await getPlatformId();
  const courses = await fetchCourses(platformId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection
          title={'Course Management'}
          subtitle={"Manage your organization's courses"}
        />
        <CourseTable courses={courses} />
      </div>
    </div>
  );
}
