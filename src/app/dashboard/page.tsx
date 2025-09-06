import { SectionComponents } from '@/components/sections';
import fetchTheme from '@/types/theme';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';

export default async function HostDashboardPage() {
  const theme = await fetchTheme();
  const pageTemplate = await fetchPageTemplate(PageType.Dashboard);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {pageTemplate.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => {
            const Component =
              SectionComponents[section.type as keyof typeof SectionComponents];

            if (!Component) {
              console.warn(`Unknown section type: ${section.type}`);
              return null;
            }

            if (section.type == 'header')
              return <Component key={index} {...section.props} theme={theme} />;
            return (
              <div key={index} className={'px-8 sm:px-12 lg:px-16'}>
                <Component {...section.props} theme={theme} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
