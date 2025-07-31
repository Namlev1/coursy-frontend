import { SectionComponents } from '@/components/sections';
import { getTenantConfig } from '@/types/tenant';

export default async function HomePage() {
  const tenantConfig = await getTenantConfig();

  return (
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            {tenantConfig.homePageTemplate.sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => {
                const Component =
                  SectionComponents[
                    section.type as keyof typeof SectionComponents
                  ];

                if (!Component) {
                  console.warn(`Unknown section type: ${section.type}`);
                  return null;
                }

                return (
                  <Component
                    key={index}
                    {...section.props}
                    theme={tenantConfig.theme}
                  />
                );
              })}
          </div>
        </div>
  );
}
