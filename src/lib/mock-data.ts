export interface TenantConfig {
  id: string
  name: string
  branding: {
    primaryColor: string
    textPrimary: string
    textSecondary: string
    backgroundLight: string
    borderColor: string
    logoUrl?: string
  }
  homePageTemplate: {
    sections: PageSection[]
  }
}

export interface PageSection {
  type: string
  order: number
  props: Record<string, any>
}

// Mock database - in real app this would be in your COURSY-PLATFORMS service
export const mockTenantConfigs: Record<string, TenantConfig> = {
  'coursy': {
    id: 'coursy',
    name: 'Coursy',
    branding: {
      primaryColor: '#0c7ff2',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      backgroundLight: '#f9fafb',
      borderColor: '#e5e7eb'
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
              { label: 'Contact', href: '#' }
            ]
          }
        },
        {
          type: 'hero',
          order: 2,
          props: {
            title: 'Empower Your Organization with Custom Learning Platforms',
            subtitle: 'CourseHub provides a seamless solution for organizations to create, manage, and deliver engaging video courses. Build your own branded learning experience and empower your team.',
            backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE2HQLyVW3z1J0nWJAyww3te-dZ5YmUxPFtAyOvPHxavjxrL5rxADflMB90-_i8cWTmApqUYiO9iqfxAUDvzXem-pBeoqS4Qq7anfHj-0b3W9nZLMVIKpdzIAfFvkq850fxrAh6wDAWETZIV7UWURRbvn2NKBJmeyWTioZqcqLDCfkCfCHHzdqXESYeYfF50hva1Rs5jR_LZTiu4IPuzPn6ZByIGELOknYXeg91shwuQmJXkkL9J6ho-YZYmKU08OQ2Bz7_OI5PbE',
            ctaText: 'Create Your Platform',
            ctaHref: '/signup'
          }
        },
        {
          type: 'footer',
          order: 3,
          props: {
            links: [
              { label: 'Terms of Service', href: '#' },
              { label: 'Privacy Policy', href: '#' },
              { label: 'Contact Us', href: '#' }
            ],
            copyright: '© 2024 Coursy. All rights reserved.'
          }
        }
      ]
    }
  }
}

// Mock API function - in real app this would call COURSY-PLATFORMS service
export async function getTenantConfig(tenantId: string): Promise<TenantConfig | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return mockTenantConfigs[tenantId] || null
}