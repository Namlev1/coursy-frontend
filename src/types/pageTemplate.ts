import { cache } from 'react';
import { headers } from 'next/headers';

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
}

export enum PageType {
  Home = 'Home',
  Signup = 'Signup',
  Dashboard = 'Dashboard',
  CourseCreation = 'CourseCreation',
}

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
    const headersList = await headers();
    const platformId = headersList.get('x-platform-id');

    if (!platformId) {
      throw new Error('Platform ID not found in headers');
    }

    return await fetchPageTemplateInternal(platformId, pageType);
  }
);

export default fetchPageTemplate;
