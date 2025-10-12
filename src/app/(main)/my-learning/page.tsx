import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import Banner from '@/components/sections/learning/Banner';

export default function MyLearningPage() {
  return (
    <>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
          <PageHeaderSection title={'My learning'} />
          <Banner />
        </div>
      </div>
    </>
  );
}
