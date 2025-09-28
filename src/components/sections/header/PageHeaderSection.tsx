import { useConfig } from '@/components/ConfigProvider';

interface PageHeaderSectionProps {
  title: string;
  subtitle?: string;
}

export function PageHeaderSection({ title, subtitle }: PageHeaderSectionProps) {
  const config = useConfig();

  return (
    <div>
      <h1
        className="text-3xl font-bold text-gray-900 mb-2 mt-8"
        style={{ color: config.colors.secondary }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </div>
  );
}