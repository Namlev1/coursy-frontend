import { PlatformConfig } from '@/types/platformConfig';

export interface PlatformRequest {
  name: string;
  description: string;
  config: Omit<PlatformConfig, 'navbarConfig' | 'footerItems'>;
}
