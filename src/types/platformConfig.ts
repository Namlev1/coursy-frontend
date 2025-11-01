export interface PlatformConfig {
  colors: Colors;
  navbarConfig: NavbarConfig;
  footerItems: FooterItem[];
  courseListLayout: CourseListLayout;
  videoPlayerType: VideoPlayerType;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
}

export interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

export interface NavbarConfig {
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

export interface FooterItem {
  href: string;
  label: string;
  order: number;
}

export enum CourseListLayout {
  GRID = 'Grid',
  LIST = 'List',
  TABLE = 'Table',
  ALBUM = 'Album',
}

export enum VideoPlayerType {
  MINIMAL = 'Minimal',
  ADVANCED = 'Advanced',
  BRANDED = 'Branded',
  CINEMA = 'Cinema',
}