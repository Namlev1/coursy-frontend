import { UUID } from 'node:crypto';

export interface Course {
  id: UUID;
  name: string;
  description: string;
  imageUrl: string;
}
