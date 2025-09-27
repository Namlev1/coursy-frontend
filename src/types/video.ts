import { UUID } from 'node:crypto';

export interface Video {
  id: UUID;
  fileName: string;
  path: string;
  course: UUID;
  userId: UUID;
  fileSize: number;
  uploadedAt: Date;
  duration: number;
  title: string;
  description: string;
  thumbnail: string;
}

export enum ThumbnailType {
  TEN = 'TEN',
  TWENTY_FIVE = 'TWENTY_FIVE',
  FIFTY = 'FIFTY',
  CUSTOM = 'CUSTOM',
}

export enum ThumbnailSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
