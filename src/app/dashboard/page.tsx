import fetchTheme from '@/types/theme';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import HeaderSection from '@/components/sections/header/HeaderSection';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardContentGrid from '@/components/sections/dashboard/home/DashboardContentGrid';
import DashboardContentRows from '@/components/sections/dashboard/home/DashboardContentRows';

export default async function HostDashboardPage() {
  const theme = await fetchTheme();
  const pageTemplate = await fetchPageTemplate(PageType.Dashboard);

  const layout = pageTemplate.props?.layout;
  const header = pageTemplate.sections.find((it) => it.type == 'header');
  const pageHeader = pageTemplate.sections.find(
    (it) => it.type == 'page-header'
  );
  const content = pageTemplate.sections
    .filter(
      (section) => section.type != 'header' && section.type != 'page-header'
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <HeaderSection
          logoText={header?.props['logoText']}
          logoUrl={header?.props['logoUrl']}
          navigation={header?.props['navigation']}
        />
        <div className={'px-8 sm:px-12 lg:px-16'}>
          {pageHeader && (
            <PageHeaderSection
              title={pageHeader?.props['title']}
              subtitle={pageHeader?.props['subtitle']}
              theme={theme}
            />
          )}

          {/*content*/}
          <div>
            {layout == 'grid' ? (
              <DashboardContentGrid content={content} theme={theme} />
            ) : (
              <DashboardContentRows content={content} theme={theme} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
