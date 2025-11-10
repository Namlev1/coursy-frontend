import { UUID } from 'node:crypto';

export interface Course {
  id: UUID;
  name: string;
  description: string;
}

export interface UserCourse {
  id: UUID | null;
  userId: UUID;
  courseId: UUID;
  progress: ProgressStatus;
  finishedDay: string | null;
  currentContent: UUID;
}

export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface CourseUpdateRequest {
  name: string;
  description: string;
}