import { Role } from '@/types/enums';

interface Route {
  path: string;
  private: boolean;
  access?: Role[];
}

export const ROUTES = {
  HOME: {
    path: '/',
    private: false,
  },
  LOGIN: {
    path: '/login',
    private: false,
  },
  SIGNUP: {
    path: '/signup',
    private: false,
  },
  DASHBOARD: {
    path: '/dashboard',
    private: true,
    access: [
      Role.ROLE_HOST_OWNER,
      Role.ROLE_HOST_ADMIN,
      Role.ROLE_TENANT,
      Role.ROLE_PLATFORM_OWNER,
      Role.ROLE_PLATFORM_ADMIN,
    ],
  },
  COURSES: {
    path: '/courses',
    private: false,
  },
  NEW_PLATFORM: {
    path: '/dashboard/platforms/new',
    private: true,
    access: [Role.ROLE_HOST_OWNER, Role.ROLE_HOST_ADMIN, Role.ROLE_TENANT],
  },
  NEW_COURSE: {
    path: '/dashboard/courses/new',
    private: true,
    access: [
      Role.ROLE_TENANT,
      Role.ROLE_PLATFORM_OWNER,
      Role.ROLE_PLATFORM_ADMIN,
    ],
  },
  COURSES_MANAGEMENT: {
    path: '/dashboard/courses',
    private: true,
    access: [
      Role.ROLE_TENANT,
      Role.ROLE_PLATFORM_OWNER,
      Role.ROLE_PLATFORM_ADMIN,
    ],
  },
  MY_LEARNING: {
    path: '/my-learning',
    private: true,
    access: [Role.ROLE_PLATFORM_USER],
  },
} as const satisfies Record<string, Route>;

export const PRIVATE_ROUTES = Object.values(ROUTES)
  .filter((route) => route.private)
  .map((route) => route.path) as readonly string[];

export const isPrivateRoute = (path: string) =>
  PRIVATE_ROUTES.some((route) => path.startsWith(route));

export const canAccessRoute = (path: string, role: Role | null): boolean => {
  const matchedRoute = Object.values(ROUTES)
    .filter((route) => path.startsWith(route.path))
    .sort((a, b) => b.path.length - a.path.length)[0];

  if (!matchedRoute) {
    throw new Error(`Route not found for path: ${path}`);
  }

  console.log(
    `Checking access for path: ${path}, role: ${role}, matched route: ${matchedRoute.path}`
  );
  console.log(`Route is private: ${matchedRoute.private}`);
  if (!matchedRoute.private) {
    return true;
  }

  if (!role) {
    return false;
  }

  if (!matchedRoute.access) {
    throw new Error(
      `Private route ${matchedRoute.path} must have access roles defined`
    );
  }

  return (matchedRoute.access as Role[]).includes(role);
};