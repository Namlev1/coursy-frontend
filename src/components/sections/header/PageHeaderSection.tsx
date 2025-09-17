import { PlatformConfig } from '@/types/platformConfig';

interface PageHeaderSectionProps {
  title: string;
  subtitle?: string;
  config: PlatformConfig;
}

export function PageHeaderSection({
  title,
  subtitle,
  config,
}: PageHeaderSectionProps) {
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