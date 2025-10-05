import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardPlatformSection from '@/components/sections/dashboard/platform/DashboardPlatformSection';

export default async function DashboardPlatformPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className={'px-8 sm:px-12 lg:px-16'}>
          <PageHeaderSection
            title={'Dashboard'}
            subtitle={'Create and manage your course platforms'}
          />
          <DashboardPlatformSection />
        </div>
      </div>
    </div>
  );
}
