import { PageSection } from '@/types/pageTemplate';
import { SectionComponents } from '@/components/sections';

interface DashboardContentRowsProps {
  content: PageSection[];
}

export default function DashboardContentRows({
  content,
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

        return <Component key={index} {...section.props} />;
      })}
    </div>
  );
}
