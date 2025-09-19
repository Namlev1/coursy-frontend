import { Role } from '@/types/enums';

const adminRoles = [
  Role.ROLE_PLATFORM_OWNER,
  Role.ROLE_PLATFORM_ADMIN,
  Role.ROLE_TENANT,
  Role.ROLE_HOST_OWNER,
  Role.ROLE_HOST_ADMIN,
];

export function isAdminRole(role: Role | null): boolean {
  return role !== null && adminRoles.includes(role);
}

export function isUserRole(role: Role | null): boolean {
  return role !== null && role === Role.ROLE_PLATFORM_USER;
}
