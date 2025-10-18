import { SectionComponents } from '@/components/sections';
import fetchPageTemplate, { PageType } from '@/types/pageTemplate';
import { getCachedConfig } from '@/lib/configCache';
import { getPlatformId } from '@/lib/headerUtils';

export default async function SignupPage() {
  const pageTemplate = await fetchPageTemplate(PageType.Signup);
  const config = await getCachedConfig();
  const platformId = await getPlatformId();

  return (
    <div>
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
            <Component
              key={index}
              {...section.props}
              config={config}
              platformId={platformId}
            />
          );
        })}
    </div>
  );
}
