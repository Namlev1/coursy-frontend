import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import DashboardContentGrid from '@/components/sections/dashboard/home/DashboardContentGrid';
import DashboardContentRows from '@/components/sections/dashboard/home/DashboardContentRows';

export default async function DashboardPage() {
  const pageTemplate = await fetchPageTemplate(PageType.Dashboard);
  const layout = pageTemplate.props?.layout;

  const pageHeader = pageTemplate.sections.find(
    (it) => it.type == 'page-header'
  );
  const content = pageTemplate.sections
    .filter(
      (section) => section.type != 'header' && section.type != 'page-header'
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div className="relative flex size-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className={'px-8 sm:px-12 lg:px-16'}>
          {pageHeader && (
            <PageHeaderSection
              title={pageHeader?.props['title']}
              subtitle={pageHeader?.props['subtitle']}
            />
          )}

          {/*content*/}
          <div>
            {layout == 'grid' ? (
              <DashboardContentGrid content={content} />
            ) : (
              <DashboardContentRows content={content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
