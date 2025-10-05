import { PlatformConfig } from '@/types/platformConfig';
import { UUID } from 'node:crypto';

export interface PlatformRequest {
  name: string;
  description: string;
  config: PlatformConfig;
}

export interface PlatformResponse {
  id: UUID;
  name: string;
  description: string;
  config: PlatformConfig;
}
