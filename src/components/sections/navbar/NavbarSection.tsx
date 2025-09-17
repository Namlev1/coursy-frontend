import React from 'react';
import { getCachedConfig } from '@/lib/configCache';
import NavbarLogo from '@/components/sections/navbar/NavbarLogo';
import NavbarNavigation from '@/components/sections/navbar/NavbarNavigation';
import NavbarUser from '@/components/sections/navbar/NavbarUser';

export default async function NavbarSection() {
  const config = await getCachedConfig();
  const navbarConfig = config.navbarConfig;

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 {/*max-w-7xl*/} items-center justify-between px-8 sm:px-12 lg:px-16">
        <NavbarLogo
          logoUrl={navbarConfig.logoUrl}
          logoText={navbarConfig.logoText}
          isLogoVisible={navbarConfig.isLogoVisible}
        />

        <NavbarNavigation navItems={navbarConfig.navItems} />

        <NavbarUser config={config} />
      </div>
    </header>
  );
}
