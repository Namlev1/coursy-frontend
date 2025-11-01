import { ReactNode } from 'react';
import { getCachedConfig } from '@/lib/configCache';

export default async function AddLayout({ children }: { children: ReactNode }) {
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-center min-h-full w-full">
            <div className="w-full max-w-2xl px-4 py-8">
              <div
                className="rounded-lg shadow-lg p-8"
                style={{ backgroundColor: config.colors.background }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
