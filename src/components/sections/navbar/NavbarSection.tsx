import React from 'react';
import { getCachedConfig } from '@/lib/configCache';
import NavbarLogo from '@/components/sections/navbar/NavbarLogo';
import NavbarNavigation from '@/components/sections/navbar/NavbarNavigation';
import NavbarUser from '@/components/sections/navbar/NavbarUser';
import { getPlatformId } from '@/lib/headerUtils';
import { getLogo } from '@/lib/apiClient';

export default async function NavbarSection() {
  const config = await getCachedConfig();
  const navbarConfig = config.navbarConfig;
  const platformId = await getPlatformId();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-8 sm:px-12 lg:px-16">
        <div className="flex-1 flex justify-start">
          <NavbarLogo
            logoUrl={getLogo(platformId)}
            logoText={navbarConfig.logoText}
          />
        </div>
        <NavbarNavigation navItems={navbarConfig.navItems} />
        <div className="flex-1 flex justify-end">
          <NavbarUser />
        </div>
      </div>
    </header>
  );
}