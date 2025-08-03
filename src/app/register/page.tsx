import { SectionComponents } from '@/components/sections';
import { getTenantConfig } from '@/types/tenant';

export default async function SignupPage() {
  const tenantConfig = await getTenantConfig();

  return (
    <div>
      {tenantConfig.signupPageTemplate.sections
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
              theme={tenantConfig.theme}
            />
          );
        })}
    </div>
  );
}
