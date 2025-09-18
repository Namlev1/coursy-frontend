import NavbarSection from './navbar/NavbarSection';
import HeroSection from './hero/HeroSection';
import FooterSection from './footer/FooterSection';
import SignupFormCenteredSection from './signup/SignupFormCenteredSection';
import QuickActionsSection from '@/components/sections/dashboard/home/QuickActionsSection';
import AnalyticsGridSection from '@/components/sections/dashboard/home/AnalyticsGridSection';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseCreationFormSection from '@/components/sections/dashboard/home/CourseCreationFormSection';
import LoginFormCenteredSection from '@/components/sections/login/LoginFormCenteredSection';
import PlatformsTableSection from '@/components/sections/dashboard/home/PlatformsTableSection';
import SubscriptionPlanSection from '@/components/sections/dashboard/home/SubscriptionPlanSection';
import SupportSection from '@/components/sections/dashboard/home/SupportSection';
import OrganizationDetailsSection from '@/components/sections/dashboard/home/OrganizationDetailsSection';
import CourseGridSection from '@/components/sections/courses/CourseGridSection';

export const SectionComponents = {
  header: NavbarSection,
  hero: HeroSection,
  footer: FooterSection,
  'signup-form-centered': SignupFormCenteredSection,
  'login-form-centered': LoginFormCenteredSection,
  'quick-actions': QuickActionsSection,
  'analytics-grid': AnalyticsGridSection,
  'page-header': PageHeaderSection,
  'course-creation-form': CourseCreationFormSection,
  'organization-details': OrganizationDetailsSection,
  'platforms-table': PlatformsTableSection,
  'subscription-plan': SubscriptionPlanSection,
  support: SupportSection,
  courses: CourseGridSection,
};
