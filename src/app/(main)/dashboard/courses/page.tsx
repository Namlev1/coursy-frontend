import { getCachedConfig } from '@/lib/configCache';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseTable from '@/components/sections/dashboard/courses/CourseTable';
import { API_BASE_URL } from '@/api/client';
import { Course } from '@/types/course';
import { getPlatformId } from '@/utils/headerUtils';

async function fetchCourses(platformId: string): Promise<Course[]> {
  const params = new URLSearchParams({
    page: '0',
    size: '20',
  });
  const response = await fetch(
    `${API_BASE_URL}/api/courses/page/${platformId}?${params}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  const json = await response.json();
  return json['_embedded']?.courseResponseList || [];
}

export default async function CoursesDashboardPage() {
  const config = await getCachedConfig();
  const platformId = await getPlatformId();
  const courses = await fetchCourses(platformId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <PageHeaderSection
          title={'Course Management'}
          subtitle={"Manage your organization's courses"}
          config={config}
        />
        <CourseTable courses={courses} config={config} />
      </div>
    </div>
  );
}
