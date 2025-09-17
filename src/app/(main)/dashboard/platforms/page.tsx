import NavbarSection from '@/components/sections/navbar/NavbarSection';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardPlatformSection from '@/components/sections/dashboard/platform/DashboardPlatformSection';
import { getCachedConfig } from '@/lib/configCache';

export default async function DashboardPlatformPage() {
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <NavbarSection />
        <div className={'px-8 sm:px-12 lg:px-16'}>
          <PageHeaderSection
            title={'Dashboard'}
            subtitle={'Create and manage your course platforms'}
            config={config}
          />
          <DashboardPlatformSection config={config} />
        </div>
      </div>
    </div>
  );
}
