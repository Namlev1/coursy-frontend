import { mockTenantConfigs, PageSection } from '@/lib/mock-data';
import { cache } from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export interface TenantConfig {
  id: string;
  name: string;
  title: string;
  theme: TenantTheme;
  homePageTemplate: {
    sections: PageSection[];
  };
  signupPageTemplate: {
    sections: PageSection[];
  };
  dashboardPageTemplate: {
    sections: PageSection[];
  };
  courseCreationPageTemplate: {
    sections: PageSection[];
  };
}

export interface TenantTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    textPrimary: string;
  };

  courseListLayout: 'grid' | 'list' | 'table' | 'album';
  videoPlayerType: 'minimal' | 'advanced' | 'branded' | 'cinema';
}

const fetchTenantConfig = cache(async (tenantId: string) => {
  // todo remove mock
  await new Promise((resolve) => setTimeout(resolve, 100));

  const config = mockTenantConfigs[tenantId];
  if (!config) {
    return notFound();
  }
  return config;
});

export const getTenantConfig = cache(async () => {
  const headersList = await headers();
  const tenantId = headersList.get('x-tenant-id') || 'coursy';
  return fetchTenantConfig(tenantId);
});

export const getTenantPageTemplate = cache(
  async (pageType: 'home' | 'signup' | 'dashboard' | 'course-create') => {
    const config = await getTenantConfig();
    if (!config) return null;

    switch (pageType) {
      case 'home':
        return config.homePageTemplate;
      case 'signup':
        return config.signupPageTemplate;
      case 'dashboard':
        return config.dashboardPageTemplate;
      case 'course-create':
        return config.courseCreationPageTemplate;
      default:
        return null;
    }
  }
);
