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

export interface NavItem {
  href: string;
  label: string;
  access: NavItemAccess;
}

export enum NavItemAccess {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated',
  USER = 'user',
  ADMIN = 'admin',
}

interface FooterItem {
  href: string;
  label: string;
  order: number;
}
