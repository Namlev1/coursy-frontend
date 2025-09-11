import HeaderSection from './header/HeaderSection';
import HeroSection from './hero/HeroSection';
import FooterSection from './footer/FooterSection';
import SignupFormCenteredSection from './signup/SignupFormCenteredSection';
import QuickActionsSection from '@/components/sections/dashboard/QuickActionsSection';
import AnalyticsGridSection from '@/components/sections/dashboard/AnalyticsGridSection';
import { PageHeaderSection } from '@/components/sections/header/PageHeaderSection';
import CourseCreationFormSection from '@/components/sections/dashboard/CourseCreationFormSection';
import LoginFormCenteredSection from '@/components/sections/login/LoginFormCenteredSection';

export const SectionComponents = {
  header: HeaderSection,
  hero: HeroSection,
  footer: FooterSection,
  'signup-form-centered': SignupFormCenteredSection,
  'login-form-centered': LoginFormCenteredSection,
  'quick-actions': QuickActionsSection,
  'analytics-grid': AnalyticsGridSection,
  'page-header': PageHeaderSection,
  'course-creation-form': CourseCreationFormSection,
};
