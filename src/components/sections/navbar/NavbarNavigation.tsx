'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavItem, NavItemAccess } from '@/types/platformConfig';
import { useAppSelector } from '@/store/hooks/redux';
import { isAdminRole, isUserRole } from '@/lib/roleUtils';
import { ROUTES } from '@/lib/routes';

interface NavbarNavigationProps {
  navItems: NavItem[];
}

export default function NavbarNavigation({ navItems }: NavbarNavigationProps) {
  const pathname = usePathname();
  const authState = useAppSelector((state) => state.auth);

  const navItemsToRender = navItems.filter((navItem) => {
    return (
      navItem.access === NavItemAccess.PUBLIC ||
      (navItem.access === NavItemAccess.AUTHENTICATED &&
        authState.isAuthenticated) ||
      (navItem.access === NavItemAccess.ADMIN && isAdminRole(authState.role)) ||
      (navItem.access === NavItemAccess.USER && isUserRole(authState.role))
    );
  });

  const isActiveRoute = (pathname: string, navItemHref: string) => {
    if (navItemHref !== ROUTES.HOME.path) {
      return pathname.startsWith(navItemHref);
    }
    return pathname === navItemHref;
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItemsToRender.map((item) => {
        const isActive = isActiveRoute(pathname, item.href);
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
