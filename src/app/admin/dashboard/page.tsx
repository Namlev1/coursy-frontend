import { SectionComponents } from '@/components/sections';
import { getTenantConfig, getTenantPageTemplate } from '@/types/tenant';

export default async function DashboardPage() {
  const tenantConfig = await getTenantConfig();
  const pageTemplate = await getTenantPageTemplate('dashboard');

  if (!tenantConfig || !pageTemplate) {
    return <div>Dashboard not found</div>;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="flex h-full grow">
        {/* Sidebar - always first */}
        {pageTemplate.sections
          .filter((section) => section.type === 'sidebar')
          .map((section, index) => {
            const Component =
              SectionComponents[section.type as keyof typeof SectionComponents];
            return Component ? (
              <Component
                key={`sidebar-${index}`}
                {...section.props}
                theme={tenantConfig.theme}
              />
            ) : null;
          })}

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {pageTemplate.sections
              .filter((section) => section.type !== 'sidebar')
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
        </main>
      </div>
    </div>
  );
}
