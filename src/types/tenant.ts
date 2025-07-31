import { mockTenantConfigs, PageSection } from '@/lib/mock-data';
import { cache } from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export interface TenantConfig {
  id: string;
  name: string;
  title: string
  theme: TenantTheme;
  homePageTemplate: {
    sections: PageSection[];
  };
}

export interface TenantTheme {
  // Colors (stored as CSS variables)
  colors: {
    primary: string
    secondary: string
    tertiary: string
    background: string
  }

  courseListLayout: 'grid' | 'list' | 'table' | 'album'
  videoPlayerType: 'minimal' | 'advanced' | 'branded' | 'cinema'
}

const fetchTenantConfig = cache(async (tenantId: string) => {
  // todo remove mock
  await new Promise((resolve) => setTimeout(resolve, 100));

  const config = mockTenantConfigs[tenantId];
  if(!config) {
    return notFound()
  }
  return config
});

export const getTenantConfig = cache(async () => {
  const headersList = headers();
  const tenantId = headersList.get('x-tenant-id') || 'coursy';
  return fetchTenantConfig(tenantId);
});