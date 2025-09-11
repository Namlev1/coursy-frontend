import { UUID } from 'node:crypto';
import { Role } from '@/types/enums';

export interface User {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  roleName: Role;
}
