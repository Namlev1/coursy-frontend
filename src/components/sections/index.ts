import HeaderSection from './header/HeaderSection';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import SignupFormCenteredSection from './SignupFormCenteredSection';
import SidebarSection from '@/components/sections/SidebarSection';
import StatsCardsSection from '@/components/sections/StatsCardsSection';
import QuickActionsSection from '@/components/sections/QuickActionsSection';
import AnalyticsGridSection from '@/components/sections/AnalyticsGridSection';
import { PageHeaderSection } from '@/components/sections/PageHeaderSection';
import CourseCreationFormSection from '@/components/sections/CourseCreationFormSection';
import OrganizationDetailsSection from '@/components/sections/OrganizationDetailsSection';
import PlatformsTableSection from '@/components/sections/PlatformsTableSection';
import SubscriptionSidebarSection from '@/components/sections/SubscriptionSidebarSection';

export const SectionComponents = {
  header: HeaderSection,
  hero: HeroSection,
  footer: FooterSection,
  'signup-form-centered': SignupFormCenteredSection,
  sidebar: SidebarSection,
  'stats-cards': StatsCardsSection,
  'quick-actions': QuickActionsSection,
  'analytics-grid': AnalyticsGridSection,
  'page-header': PageHeaderSection,
  'course-creation-form': CourseCreationFormSection,
  'organization-details': OrganizationDetailsSection,
  'platforms-table': PlatformsTableSection,
  'subscription-sidebar': SubscriptionSidebarSection,
};
