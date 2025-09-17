import React from 'react';
import { getCachedConfig } from '@/lib/configCache';

export default async function FooterSection() {
  const { colors, footerItems } = await getCachedConfig();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.textPrimary,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {footerItems.map((link) => (
              <a
                key={link.label}
                className="transition-colors hover:opacity-80"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
