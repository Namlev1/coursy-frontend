import { PageSection } from '@/types/pageTemplate';
import { SectionComponents } from '@/components/sections';
import { useConfig } from '@/components/ConfigProvider';

interface DashboardContentGridProps {
  content: PageSection[];
}

export default function DashboardContentGrid({
  content,
}: DashboardContentGridProps) {
  const config = useConfig();
  const midpoint = Math.ceil(content.length / 2);
  const firstHalf = content.slice(0, midpoint);
  const secondHalf = content.slice(midpoint);

  const renderComponent = (section: PageSection, index: number) => {
    console.log('Rendering section:', section);
    const Component =
      SectionComponents[section.type as keyof typeof SectionComponents];

    if (!Component) {
      console.warn(`Unknown section type: ${section.type}`);
      return null;
    }

    return <Component key={index} {...section.props} config={config} />;
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 flex flex-col gap-8">
        {firstHalf.map(renderComponent)}
      </div>
      <div className="lg:col-span-1 flex flex-col gap-8">
        {secondHalf.map(renderComponent)}
      </div>
    </div>
  );
}
