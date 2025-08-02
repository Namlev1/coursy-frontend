import { TenantTheme } from '@/types/tenant';

interface DashboardHeaderSectionProps {
  title: string
  subtitle?: string
  theme: TenantTheme
}

export function DashboardHeaderSection({ title, subtitle, theme }: DashboardHeaderSectionProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
    </div>
  )
}