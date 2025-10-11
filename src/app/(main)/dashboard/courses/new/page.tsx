import { SectionComponents } from '@/components/sections';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import { getCachedConfig } from '@/lib/configCache';

export default async function CourseCreationPage() {
  const pageTemplate = await fetchPageTemplate(PageType.CourseCreation);
  const config = await getCachedConfig();

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

            return (
              <div key={index} className={'px-8 sm:px-12 lg:px-16'}>
                <Component {...section.props} config={config} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
