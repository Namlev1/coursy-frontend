import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardContentGrid from '@/components/sections/dashboard/home/DashboardContentGrid';
import DashboardContentRows from '@/components/sections/dashboard/home/DashboardContentRows';
import { getCachedConfig } from '@/lib/configCache';

export default async function DashboardPage() {
  const pageTemplate = await fetchPageTemplate(PageType.Dashboard);
  const layout = pageTemplate.props?.layout;
  const config = await getCachedConfig();

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
        <div className={'px-8 sm:px-12 lg:px-16'}>
          {pageHeader && (
            <PageHeaderSection
              title={pageHeader?.props['title']}
              subtitle={pageHeader?.props['subtitle']}
              config={config}
            />
          )}

          {/*content*/}
          <div>
            {layout == 'grid' ? (
              <DashboardContentGrid content={content} config={config} />
            ) : (
              <DashboardContentRows content={content} config={config} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
