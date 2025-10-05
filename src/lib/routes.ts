interface Route {
  path: string;
  private: boolean;
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
  },
  COURSES: {
    path: '/courses',
    private: false,
  },
  NEW_PLATFORM: {
    path: '/dashboard/platforms/new',
    private: true,
  },
} as const satisfies Record<string, Route>;

export const PRIVATE_ROUTES = Object.values(ROUTES)
  .filter((route) => route.private)
  .map((route) => route.path) as readonly string[];

export const isPrivateRoute = (path: string) =>
  PRIVATE_ROUTES.some((route) => path.startsWith(route));
