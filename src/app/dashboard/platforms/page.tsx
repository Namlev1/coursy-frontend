import fetchTheme from '@/types/theme';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import HeaderSection from '@/components/sections/header/HeaderSection';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardPlatformSection from '@/components/sections/dashboard/platform/DashboardPlatformSection';

export default async function DashboardPlatformPage() {
  const theme = await fetchTheme();
  const pageTemplate = await fetchPageTemplate(PageType.Dashboard);

  const header = pageTemplate.sections.find((it) => it.type == 'header');

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <HeaderSection
          logoText={header?.props['logoText']}
          logoUrl={header?.props['logoUrl']}
          navigation={header?.props['navigation']}
        />
        <div className={'px-8 sm:px-12 lg:px-16'}>
          <PageHeaderSection
            title={'Dashboard'}
            subtitle={'Create and manage your course platforms'}
            theme={theme}
          />
          <DashboardPlatformSection theme={theme} />
        </div>
      </div>
    </div>
  );
}
