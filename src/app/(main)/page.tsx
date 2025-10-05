import { SectionComponents } from '@/components/sections';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';

export default async function HomePage() {
  const pageTemplate = await fetchPageTemplate(PageType.Home);

  return (
    <div className="flex flex-col flex-1 height-max">
      {pageTemplate.sections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => {
          const Component =
            SectionComponents[section.type as keyof typeof SectionComponents];
          if (!Component) {
            console.warn(`Unknown section type: ${section.type}`);
            return null;
          }
          return <Component key={index} {...section.props} />;
        })}
    </div>
  );
}