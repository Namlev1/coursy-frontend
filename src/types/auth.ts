import { Role } from '@/types/enums';

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleName: Role;
}