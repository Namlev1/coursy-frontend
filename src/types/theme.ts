import { cache } from 'react';
import { headers } from 'next/headers';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    textPrimary: string;
  };

  courseListLayout: 'Grid' | 'List' | 'Table' | 'Album';
  videoPlayerType: 'Minimal' | 'Advanced' | 'Branded' | 'Cinema';
}

const fetchThemeInternal = async (platformId: string): Promise<Theme> => {
  const response = await fetch(
    `http://localhost:8080/api/platforms/${platformId}/theme`
  );
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch platform theme: ${response.status}.\n${errorBody}`
    );
  }
  return await response.json();
};

const fetchTheme = cache(async (): Promise<Theme> => {
  const headersList = await headers();
  const platformId = headersList.get('x-platform-id');

  if (!platformId) {
    throw new Error('Platform ID not found in headers');
  }

  return await fetchThemeInternal(platformId);
});

export default fetchTheme;
