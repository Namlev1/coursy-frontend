import { UUID } from 'node:crypto';

export interface TextContent {
  title: string;
  position?: number;
  course: UUID | null;
  id?: UUID | null;
  content: string;
}
