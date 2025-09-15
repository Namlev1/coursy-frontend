import { PageSection } from '@/types/pageTemplate';
import { SectionComponents } from '@/components/sections';
import { PlatformConfig } from '@/types/platformConfig';

interface DashboardContentRowsProps {
  content: PageSection[];
  theme: PlatformConfig;
}

export default function DashboardContentRows({
  content,
  theme,
}: DashboardContentRowsProps) {
  return (
    <div>
      {content.map((section, index) => {
        const Component =
          SectionComponents[section.type as keyof typeof SectionComponents];

        if (!Component) {
          console.warn(`Unknown section type: ${section.type}`);
          return null;
        }

        return <Component key={index} {...section.props} theme={theme} />;
      })}
    </div>
  );
}
