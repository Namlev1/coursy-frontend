import { SectionComponents } from '@/components/sections';
import { getTenantConfig, getTenantPageTemplate } from '@/types/tenant';

// Fixed theme for host dashboard
const hostTheme = {
  colors: {
    primary: '#1383eb',
    secondary: '#64748b',
    tertiary: '#10b981',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
  },
};

export default async function HostDashboardPage() {
  const tenantConfig = await getTenantConfig();
  const hostDashboardPageTemplate =
    await getTenantPageTemplate('host-dashboard');

  if (!tenantConfig || !hostDashboardPageTemplate) {
    return <div>Course creation not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {hostDashboardPageTemplate.sections
        .filter((section) => section.type === 'header')
        .map((section, index) => {
          const Component =
            SectionComponents[section.type as keyof typeof SectionComponents];
          return Component ? (
            <Component
              key={`header-${index}`}
              {...section.props}
              theme={hostTheme}
            />
          ) : null;
        })}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          {hostDashboardPageTemplate.sections
            .filter((section) => section.type === 'page-header')
            .map((section, index) => {
              const Component =
                SectionComponents[
                  section.type as keyof typeof SectionComponents
                ];
              return Component ? (
                <Component
                  key={`page-header-${index}`}
                  {...section.props}
                  theme={hostTheme}
                />
              ) : null;
            })}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {hostDashboardPageTemplate.sections
                  .filter((section) =>
                    ['organization-details', 'platforms-table'].includes(
                      section.type
                    )
                  )
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => {
                    const Component =
                      SectionComponents[
                        section.type as keyof typeof SectionComponents
                      ];
                    return Component ? (
                      <Component
                        key={index}
                        {...section.props}
                        theme={hostTheme}
                      />
                    ) : null;
                  })}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {hostDashboardPageTemplate.sections
                .filter((section) => section.type === 'subscription-sidebar')
                .map((section, index) => {
                  const Component =
                    SectionComponents[
                      section.type as keyof typeof SectionComponents
                    ];
                  return Component ? (
                    <Component
                      key={`sidebar-${index}`}
                      {...section.props}
                      theme={hostTheme}
                    />
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}