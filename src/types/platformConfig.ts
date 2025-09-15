export interface PlatformConfig {
  colors: Colors;
  navbarConfig: NavbarConfig;
  footerItems: FooterItem[];
  courseListLayout: 'Grid' | 'List' | 'Table' | 'Album';
  videoPlayerType: 'Minimal' | 'Advanced' | 'Branded' | 'Cinema';
}

interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

interface NavbarConfig {
  logoUrl: string | null;
  logoText: string;
  isLogoVisible: boolean;
  navItems: NavItem[];
}

interface NavItem {
  href: string;
  label: string;
  access: 'public' | 'authenticated' | 'user' | 'admin';
}

interface FooterItem {
  href: string;
  label: string;
  order: number;
}
