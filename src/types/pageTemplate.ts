import { cache } from 'react';
import { getPlatformId } from '@/utils/headerUtils';

export interface PageSection {
  type: string;
  order: number;
  props: Record<string, any>;
}

export interface PageTemplate {
  id: string;
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

// todo think about caching
const fetchPageTemplateInternal = async (
  platformId: string,
  pageType: PageType
): Promise<PageTemplate> => {
  const response = await fetch(
    `http://localhost:8080/api/platforms/${platformId}/templates/${pageType}`
  );
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch template: ${response.status}.\n${errorBody}`
    );
  }
  return await response.json();
};

const fetchPageTemplate = cache(
  async (pageType: PageType): Promise<PageTemplate> => {
    const platformId = await getPlatformId();

    return await fetchPageTemplateInternal(platformId, pageType);
  }
);

export default fetchPageTemplate;
