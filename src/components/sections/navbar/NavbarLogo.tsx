'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import { useAppSelector } from '@/store/hooks/redux';

interface NavbarLogoProps {
  logoUrl: string;
  logoText: string;
}

export default function NavbarLogo({ logoUrl, logoText }: NavbarLogoProps) {
  const authState = useAppSelector((state) => state.auth);
  return (
    <Link
      href={
        authState.isAuthenticated ? ROUTES.DASHBOARD.path : ROUTES.HOME.path
      }
      className="flex items-center gap-2"
    >
      <Image src={logoUrl} alt="Company logo" width={36} height={36} />
      <h1 className="text-xl font-bold text-gray-900">{logoText}</h1>
    </Link>
  );
}
