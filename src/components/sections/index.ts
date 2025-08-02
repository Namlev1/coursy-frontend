import HeaderSection from './HeaderSection';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import SignupFormCenteredSection from './SignupFormCenteredSection';
import SidebarSection from '@/components/sections/SidebarSection';
import StatsCardsSection from '@/components/sections/StatsCardsSection';
import QuickActionsSection from '@/components/sections/QuickActionsSection';
import AnalyticsGridSection from '@/components/sections/AnalyticsGridSection';
import { DashboardHeaderSection } from '@/components/sections/DashboardHeaderSection';

export const SectionComponents = {
  header: HeaderSection,
  hero: HeroSection,
  footer: FooterSection,
  'signup-form-centered': SignupFormCenteredSection,
  sidebar: SidebarSection,
  'stats-cards': StatsCardsSection,
  'quick-actions': QuickActionsSection,
  'analytics-grid': AnalyticsGridSection,
  'dashboard-header': DashboardHeaderSection
};
