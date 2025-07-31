import { TenantConfig } from '@/types/tenant';

export interface PageSection {
  type: string;
  order: number;
  props: Record<string, any>;
}

// Mock database - in real app this would be in your COURSY-PLATFORMS service
export const mockTenantConfigs: Record<string, TenantConfig> = {
  coursy: {
    id: 'coursy',
    name: 'Coursy',
    title: 'Coursy - Empower Your Organization',
    theme: {
      colors: {
        primary: '#0d7ff3',
        secondary: '#000000',
        tertiary: '#000000',
        background: '#fefeff',
        textPrimary: '#000000',
      },
      courseListLayout: 'grid',
      videoPlayerType: 'minimal',
    },
    homePageTemplate: {
      sections: [
        {
          type: 'header',
          order: 1,
          props: {
            logoText: 'Coursy',
            navigation: [
              { label: 'Home', href: '#' },
              { label: 'Features', href: '#' },
              { label: 'Pricing', href: '#' },
              { label: 'Contact', href: '#' },
            ],
          },
        },
        {
          type: 'hero',
          order: 2,
          props: {
            title: 'Empower Your Organization with Custom Learning Platforms',
            subtitle:
              'Coursy provides a seamless solution for organizations to create, manage, and deliver engaging video courses. Build your own branded learning experience and empower your team.',
            backgroundImage:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCE2HQLyVW3z1J0nWJAyww3te-dZ5YmUxPFtAyOvPHxavjxrL5rxADflMB90-_i8cWTmApqUYiO9iqfxAUDvzXem-pBeoqS4Qq7anfHj-0b3W9nZLMVIKpdzIAfFvkq850fxrAh6wDAWETZIV7UWURRbvn2NKBJmeyWTioZqcqLDCfkCfCHHzdqXESYeYfF50hva1Rs5jR_LZTiu4IPuzPn6ZByIGELOknYXeg91shwuQmJXkkL9J6ho-YZYmKU08OQ2Bz7_OI5PbE',
            ctaText: 'Create Your Platform',
            ctaHref: '/signup',
          },
        },
        {
          type: 'footer',
          order: 3,
          props: {
            links: [
              { label: 'Terms of Service', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Contact Us', href: '#' },
            ],
            copyright: '© 2025 Coursy. All rights reserved.',
          },
        },
      ],
    },
  },
};
