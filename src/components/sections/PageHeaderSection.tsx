import { TenantTheme } from '@/types/tenant';

interface PageHeaderSectionProps {
  title: string;
  subtitle?: string;
  theme: TenantTheme;
}

export function PageHeaderSection({
  title,
  subtitle,
  theme,
}: PageHeaderSectionProps) {
  return (
    <div className="mb-8">
      <h1
        className="text-3xl font-bold text-gray-900 mb-2"
        style={{ color: theme.colors.secondary }}
      >
        {title}
      </h1>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </div>
  );
}