import { UUID } from 'node:crypto';

export interface Course {
  id: UUID;
  name: string;
  description: string;
  imageUrl: string;
}

export interface UserCourse {
  id: UUID | null;
  userId: UUID;
  courseId: UUID;
  progress: ProgressStatus;
  finishedDay: string | null;
  currentVideo: UUID;
}

export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}