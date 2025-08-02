import { SectionComponents } from '@/components/sections';
import { getTenantConfig, getTenantPageTemplate } from '@/types/tenant';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantConfig = await getTenantConfig();
  const pageTemplate = await getTenantPageTemplate('dashboard');

  if (!tenantConfig || !pageTemplate) {
    return <div>Dashboard not found</div>;
  }

  const sidebarSections = pageTemplate.sections.filter(
    (section) => section.type === 'sidebar'
  );

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="flex h-full grow">
        {/* Sidebar - rendered once in layout */}
        {sidebarSections.map((section, index) => {
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

        {/* Main Content - children will be rendered here */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
