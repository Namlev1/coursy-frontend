// components/ThemeProvider.tsx - Single provider
'use client';

import { ReactNode, useEffect } from 'react';
import { initializeTheme, setPlatformId } from '@/store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';

interface ThemeProviderProps {
  children: ReactNode;
  platformId: string; // Passed from server layout
}

export default function ThemeProvider({
  children,
  platformId,
}: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const { loading, initialized, error } = useAppSelector(
    (state) => state.theme
  );

  useEffect(() => {
    dispatch(setPlatformId(platformId));
    dispatch(initializeTheme(platformId));
  }, [dispatch, platformId]);

  if (loading && !initialized) {
    return <div>Loading theme...</div>;
  }

  return <>{children}</>;
}
