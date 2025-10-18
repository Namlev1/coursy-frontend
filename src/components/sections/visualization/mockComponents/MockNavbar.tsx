'use client';

import React, { useEffect, useState } from 'react';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface MockedNavbarProps {
  formData: PlatformFormData;
  selected: number;
}

export default function MockedNavbar({
  formData,
  selected,
}: MockedNavbarProps) {
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
          <button
            className={`text-sm transition-colors hover:text-primary-600 text-primary-600 ${selected === 1 ? 'font-semibold' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            Home
          </button>
          <button
            className={`text-sm transition-colors hover:text-primary-600 text-primary-600 ${selected === 2 ? 'font-semibold' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            Courses
          </button>
          <button
            className={`text-sm transition-colors hover:text-primary-600 text-primary-600 ${selected === 3 ? 'font-semibold' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            Contact
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className="hidden sm:flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-sm font-bold transition-colors hover:bg-gray-100"
            style={{ color: formData.colors.textPrimary }}
            onClick={(e) => e.preventDefault()}
          >
            Login
          </button>
          <button
            className="flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: formData.colors.primary }}
            onClick={(e) => e.preventDefault()}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
