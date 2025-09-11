import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaHref: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaHref,
}: HeroSectionProps) {
  return (
    <main className="flex-1 flex">
      <section className="relative flex-1 flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content Container */}
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6">
              {title}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>
            <a
              href={ctaHref}
              className="inline-flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 text-white text-base font-bold shadow-lg transition-transform transform hover:scale-105"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span className="truncate">{ctaText}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
