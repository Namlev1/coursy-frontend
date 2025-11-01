export interface PageSection {
  type: string;
  order: number;
  props: Record<string, any>;
}

export interface PageTemplate {
  id?: string;
  title: string;
  sections: PageSection[];
  type: PageType;
  props: Record<string, any> | null;
}

export enum PageType {
  Home = 'Home',
  Signup = 'Signup',
  Dashboard = 'Dashboard',
  Courses = 'Courses',
  CoursesDashboard = 'CoursesDashboard',
  CourseCreation = 'CourseCreation',
  Login = 'Login',
}
