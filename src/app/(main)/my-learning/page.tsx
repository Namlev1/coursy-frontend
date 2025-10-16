import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import Banner from '@/components/sections/learning/Banner';
import CourseList from '@/components/sections/courseList/CourseList';
import { fetchCurrentUserCourses } from '@/lib/apiClient';

export default async function MyLearningPage() {
  const userCourses = await fetchCurrentUserCourses();
  return (
    <>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
          <PageHeaderSection title={'My learning'} />
          <Banner userCourses={userCourses} />
          <CourseList userCourses={userCourses} />
        </div>
      </div>
    </>
  );
}
