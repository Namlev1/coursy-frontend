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
  TEN,
  TWENTY_FIVE,
  FIFTY,
  CUSTOM,
}

export enum ThumbnailSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
