'use client';

import { createContext, ReactNode, useContext } from 'react';
import { PlatformConfig } from '@/types/platformConfig';

const ConfigContext = createContext<PlatformConfig | null>(null);

export function ConfigProvider({
  config,
  children,
}: {
  config: PlatformConfig;
  children: ReactNode;
}) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return config;
}
