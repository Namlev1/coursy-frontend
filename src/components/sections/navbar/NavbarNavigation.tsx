'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/platformConfig';

interface NavbarNavigationProps {
  navItems: NavItem[];
}

export default function NavbarNavigation({ navItems }: NavbarNavigationProps) {
  const pathname = usePathname();
  console.log(navItems);

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navItems.map((item) => {
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
