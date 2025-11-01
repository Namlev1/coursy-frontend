import { cache } from 'react';
import { getPlatformId } from '@/lib/headerUtils';
import { PageTemplate, PageType } from '@/types/pageTemplate';

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
