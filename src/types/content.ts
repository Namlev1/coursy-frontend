import { UUID } from 'crypto';

export interface ContentDto {
  id: UUID;
  title: string;
  videoDuration?: number;
  type: MaterialType;
  position: number;
  quizId?: UUID;
  videoId?: UUID;
  textId?: UUID;
}
