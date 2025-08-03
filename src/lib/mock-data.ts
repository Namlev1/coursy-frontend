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
              { label: 'Home', href: '#', access: 'public' },
              { label: 'Features', href: '#', access: 'public' },
              { label: 'Pricing', href: '#', access: 'public' },
              { label: 'Contact', href: '#', access: 'public' },
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
    signupPageTemplate: {
      sections: [
        {
          type: 'signup-form-centered',
          order: 1,
          props: {
            logoText: 'Coursy',
            title: 'Create your organization',
            subtitle:
              'Join our platform and start building your course empire.',
            submitText: 'Create organization',
            loginLinkText: 'Already have an account?',
            loginLinkHref: '/login',
          },
        },
      ],
    },
    dashboardPageTemplate: {
      sections: [
        {
          type: 'header',
          order: 1,
          props: {
            logoText: 'Coursy',
            navigation: [
              {
                label: 'Home',
                href: '/',
                access: 'public',
                active: true,
              },
              { label: 'Courses', href: '/courses', access: 'public' },
              { label: 'Dashboard', href: '/dashboard', access: 'public' },
            ],
            isAuthenticated: true,
            user: {
              name: 'John Doe',
              email: 'john@acmecorp.com',
              avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDPx35_yYxQikb8S1STkWVTqCrKG9cv_ZtCqE1DM0kqYxO7Zo-_wWz5nuqy3P7b6BBmHGkBr_7n0F1cQbMLVdXYvJmNOfAU0kU4lyUAAyDR8pNGRErUdxtph-rBKCJmlm3cQr0TQK-9bCM7wggfMTeL6h-koCze-yl2Ipd_hVzAXu3PP-nGMijCe79Y1qVDF-pVTzR_vplA2I0zMZOD6SRXxUeoDmWoXZjMOoUAADHKcqjYUBE6Nb7n0AG3A-auLWQc-5sIk0l_n5k',
              role: 'Admin',
            },
          },
        },
        {
          type: 'page-header',
          order: 2,
          props: {
            title: 'Dashboard',
            subtitle:
              "Welcome back! Here's what's happening with your learning platform.",
          },
        },
        {
          type: 'stats-cards',
          order: 3,
          props: {
            stats: [
              {
                label: 'Total Courses',
                value: 25,
                icon: 'courses',
                trend: { value: '+12%', type: 'positive' },
              },
              {
                label: 'Active Users',
                value: 150,
                icon: 'users',
                trend: { value: '+8%', type: 'positive' },
              },
              {
                label: 'Recent Enrollments',
                value: 12,
                icon: 'enrollments',
                trend: { value: '+3%', type: 'positive' },
              },
            ],
          },
        },
        {
          type: 'quick-actions',
          order: 4,
          props: {
            title: 'Quick Actions',
            actions: [
              {
                label: 'Create New Course',
                href: '/courses/new',
                primary: true,
                icon: 'plus',
              },
              {
                label: 'Manage Courses',
                href: '/courses',
                primary: false,
              },
              {
                label: 'View Analytics',
                href: '/analytics',
                primary: false,
              },
            ],
          },
        },
        {
          type: 'analytics-grid',
          order: 5,
          props: {
            title: 'User Statistics',
            analytics: [
              {
                title: 'User Engagement',
                value: '75%',
                change: '+5%',
                changeType: 'positive',
                chartType: 'line',
                description: 'vs last 30 days',
                chartData: {
                  // Mock data for line chart
                  points: [
                    { x: 0, y: 109 },
                    { x: 1, y: 21 },
                    { x: 2, y: 41 },
                    { x: 3, y: 93 },
                    { x: 4, y: 33 },
                    { x: 5, y: 101 },
                    { x: 6, y: 61 },
                  ],
                },
              },
              {
                title: 'Course Completion',
                value: '60%',
                change: '+3%',
                changeType: 'positive',
                chartType: 'bar',
                description: 'vs last 30 days',
                chartData: {
                  bars: [
                    { label: 'Course A', value: 50, percentage: 50 },
                    { label: 'Course B', value: 90, percentage: 90 },
                    { label: 'Course C', value: 70, percentage: 70 },
                    { label: 'Course D', value: 55, percentage: 55 },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    courseCreationPageTemplate: {
      sections: [
        {
          type: 'page-header',
          order: 1,
          props: {
            title: 'Create a new course',
            subtitle: 'Fill in the details below to get started.',
          },
        },
        {
          type: 'course-creation-form',
          order: 2,
          props: {},
        },
      ],
    },
    hostDashboardTemplate: {
      sections: [
        {
          type: 'header',
          order: 1,
          props: {
            logoText: 'Coursy',
            navigation: [
              {
                label: 'Dashboard',
                href: '/dashboard',
                active: true,
                access: 'public',
              },
              { label: 'Platforms', href: '/platforms', access: 'public' },
              { label: 'Settings', href: '/settings', access: 'public' },
            ],
            isAuthenticated: true,
            user: {
              name: 'John Doe',
              email: 'john@acmecorp.com',
              avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDPx35_yYxQikb8S1STkWVTqCrKG9cv_ZtCqE1DM0kqYxO7Zo-_wWz5nuqy3P7b6BBmHGkBr_7n0F1cQbMLVdXYvJmNOfAU0kU4lyUAAyDR8pNGRErUdxtph-rBKCJmlm3cQr0TQK-9bCM7wggfMTeL6h-koCze-yl2Ipd_hVzAXu3PP-nGMijCe79Y1qVDF-pVTzR_vplA2I0zMZOD6SRXxUeoDmWoXZjMOoUAADHKcqjYUBE6Nb7n0AG3A-auLWQc-5sIk0l_n5k',
              role: 'Admin',
            },
          },
        },
        {
          type: 'page-header',
          order: 2,
          props: {
            title: 'Account Overview',
            subtitle: "Manage your organization's details and platforms.",
          },
        },
        {
          type: 'organization-details',
          order: 3,
          props: {
            title: 'Organization Details',
            details: [
              { label: 'Organization Name', value: 'Acme Corp' },
              { label: 'Contact Email', value: 'contact@acmecorp.com' },
              {
                label: 'Subscription Status',
                value: { type: 'badge', text: 'Active', variant: 'green' },
              },
            ],
          },
        },
        {
          type: 'platforms-table',
          order: 4,
          props: {
            title: 'Platforms',
            createButtonText: 'Create Platform',
            platforms: [
              {
                id: '1',
                name: 'Innovate & Learn',
                url: 'innovate.eduplatform.com',
                subdomain: 'innovate',
                status: 'active',
              },
              {
                id: '2',
                name: 'Marketing Masters',
                url: 'marketing.eduplatform.com',
                subdomain: 'marketing',
                status: 'active',
              },
              {
                id: '3',
                name: 'Sales Academy',
                url: 'sales.eduplatform.com',
                subdomain: 'sales',
                status: 'active',
              },
            ],
          },
        },
        {
          type: 'subscription-sidebar',
          order: 5,
          props: {
            subscription: {
              planName: 'Enterprise Plan',
              platformsUsed: 3,
              platformsLimit: 4,
              usagePercentage: 75,
            },
          },
        },
      ],
    },
  },
};
