'use client';

import React, { useEffect, useState } from 'react';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

interface MockedNavbarConfig {
  formData: PlatformFormData;
}

export default function MockedNavbar({ formData }: MockedNavbarConfig) {
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    const file = formData.logoImage?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl('');
    }
  }, [formData.logoImage]);

  return (
    <div className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-8 sm:px-12 lg:px-16">
        <div className="flex-1 flex justify-start">
          {/*Navbar logo*/}
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Company logo"
              className="h-9 w-9 object-cover rounded"
            />
          )}
        </div>
        {/*Navbar items*/}
        <div className="hidden md:flex items-center gap-8">
          <h2 className="text-sm transition-colors hover:text-primary-600 text-primary-600 font-semibold">
            Home
          </h2>
          <h2 className="text-sm font-medium transition-colors hover:text-primary-600 text-gray-500">
            Courses
          </h2>
          <h2 className="text-sm font-medium transition-colors hover:text-primary-600 text-gray-500">
            Courses
          </h2>
        </div>
        <div className="flex-1 flex justify-end">
          <Link
            href={ROUTES.LOGIN.path}
            className="hidden sm:flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-sm font-bold transition-colors hover:bg-gray-100"
            style={{ color: formData.colors.textPrimary }}
          >
            Login
          </Link>
          <Link
            href={ROUTES.SIGNUP.path}
            className="flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: formData.colors.primary }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
