import { getCachedConfig } from '@/lib/configCache';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import { SectionComponents } from '@/components/sections';

export default async function CoursesPage() {
  const config = await getCachedConfig();
  const pageTemplate = await fetchPageTemplate(PageType.Courses);
  console.log('Rendering Courses Page with template:', pageTemplate);

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
