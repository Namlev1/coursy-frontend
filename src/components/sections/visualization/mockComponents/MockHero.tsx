'use client';

import React, { useEffect, useState } from 'react';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface MockHeroSection {
  formData: PlatformFormData;
}

export default function MockHeroSection({ formData }: MockHeroSection) {
  const [heroUrl, setHeroUrl] = useState<string>('');

  useEffect(() => {
    const file = formData.heroImage?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeroUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setHeroUrl('');
    }
  }, [formData.heroImage]);

  return (
    <section
      className="flex-1 flex items-center justify-center bg-cover bg-center relative flex-1"
      style={{ backgroundImage: `url("${heroUrl}")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex-1" />

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative text-center max-w-3xl flex-1">
        <h1 className="text-white text-6xl font-extrabold leading-tight mb-6">
          {formData.heroTitle}
        </h1>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          {formData.heroSubtitle}
        </p>

        <button
          className="inline-flex items-center justify-center rounded-md h-12 px-6 text-white text-base font-bold shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: formData.colors.primary }}
          onClick={(e) => e.preventDefault()}
        >
          <span className="truncate">{formData.ctaText}</span>
        </button>
      </div>
    </section>
  );
}
