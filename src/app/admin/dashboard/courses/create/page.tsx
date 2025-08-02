import { SectionComponents } from '@/components/sections';
import { getTenantConfig, getTenantPageTemplate } from '@/types/tenant';

export default async function CreateCoursePage() {
  const tenantConfig = await getTenantConfig();
  const courseCreationPageTemplate =
    await getTenantPageTemplate('course-create');

  if (!tenantConfig || !courseCreationPageTemplate) {
    return <div>Course creation not found</div>;
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {courseCreationPageTemplate.sections
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
  );
}
