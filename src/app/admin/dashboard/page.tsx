import { SectionComponents } from '@/components/sections';
import { getTenantConfig, getTenantPageTemplate } from '@/types/tenant';

export default async function DashboardPage() {
  const tenantConfig = await getTenantConfig();
  const pageTemplate = await getTenantPageTemplate('dashboard');

  if (!tenantConfig || !pageTemplate) {
    return <div>Dashboard not found</div>;
  }

  const contentSections = pageTemplate.sections
    .filter((section) => section.type !== 'sidebar')
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {contentSections.map((section, index) => {
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
            theme={tenantConfig.theme}
          />
        );
      })}
    </>
  );
}