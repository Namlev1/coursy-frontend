import { useAppSelector } from '@/store/hooks/redux';

export const useTheme = () => {
  const { theme, loading, error, initialized, platformId } = useAppSelector(
    (state) => state.theme
  );

  return {
    theme,
    loading,
    error,
    platformId,
    isReady: initialized && !!theme && !loading,
    hasError: !!error,
  };
};
