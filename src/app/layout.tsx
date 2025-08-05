import fetchTheme from '@/types/theme';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await fetchTheme();

  const cssVariables = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-tertiary': theme.colors.tertiary,
    '--color-background': theme.colors.background,
    '--color-text-primary': theme.colors.textPrimary,
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
      </head>
      <body
        className={`${inter.className} bg-white`}
        style={cssVariables as React.CSSProperties}
      >
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
