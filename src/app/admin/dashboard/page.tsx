import { SectionComponents } from '@/components/sections';
import HeaderSection from '@/components/sections/header/HeaderSection';

export default async function DashboardPage() {
  const tenantConfig = await getTenantConfig();
  const pageTemplate = await getTenantPageTemplate('dashboard');

  if (!tenantConfig || !pageTemplate) {
    return <div>Dashboard not found</div>;
  }

  const contentSections = pageTemplate.sections
    .filter((section) => section.type !== 'header')
    .sort((a, b) => a.order - b.order);
  const header = pageTemplate.sections.find(
    (section) => section.type === 'header'
  );

  return (
    <>
      <HeaderSection
        logoText={header?.props.logoText}
        navigation={header?.props.navigation}
        theme={tenantConfig.theme}
      />
      <div className="mx-auto max-w-7xl p-8">
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
      </div>
    </>
  );
}
