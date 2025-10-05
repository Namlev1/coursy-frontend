import React from 'react';
import { getCachedConfig } from '@/lib/configCache';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaHref: string;
}

export default async function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  const config = await getCachedConfig();

  return (
    <section
      className="flex-1 flex items-center justify-center bg-cover bg-center relative flex-1"
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex-1" />

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative text-center max-w-3xl flex-1">
        <h1 className="text-white text-6xl font-extrabold leading-tight mb-6">
          {title}
        </h1>
        <p className="text-gray-200 text-xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-md h-12 px-6 text-white text-base font-bold shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: config?.colors.primary }}
        >
          <span className="truncate">{ctaText}</span>
        </a>
      </div>
    </section>
  );
}
