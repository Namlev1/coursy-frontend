import React from 'react';

interface FooterSectionProps {
  links: Array<{ label: string; href: string }>;
  copyright: string;
  theme: any;
}

export default function FooterSection({
  links,
  copyright,
  theme,
}: FooterSectionProps) {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: theme.backgroundLight,
        borderColor: theme.borderColor,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                className="transition-colors hover:opacity-80"
                style={{ color: theme.textSecondary }}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
