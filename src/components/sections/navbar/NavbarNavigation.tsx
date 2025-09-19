'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/platformConfig';
import { useAppSelector } from '@/store/hooks/redux';
import { isAdminRole, isUserRole } from '@/utils/roleUtils';

interface NavbarNavigationProps {
  navItems: NavItem[];
}

export default function NavbarNavigation({ navItems }: NavbarNavigationProps) {
  const pathname = usePathname();
  const authState = useAppSelector((state) => state.auth);

  const navItemsToRender = navItems.filter((navItem) => {
    return (
      navItem.access == 'public' ||
      (navItem.access == 'authenticated' && authState.isAuthenticated) ||
      (navItem.access == 'admin' && isAdminRole(authState.role)) ||
      (navItem.access == 'user' && isUserRole(authState.role))
    );
  });

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navItemsToRender.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-primary-600 ${
              isActive ? 'text-primary-600 font-semibold' : 'text-gray-500'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
