import { UUID } from 'node:crypto';
import { Role } from '@/types/enums';

export interface User {
  id: UUID;
  platformId: UUID | null;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: UUID;
  platformId: UUID | null;
  email: string;
  firstName: string;
  lastName: string;
  roleName: Role;
}
