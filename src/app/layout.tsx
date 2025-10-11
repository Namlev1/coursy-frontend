import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import type { Metadata } from 'next';
import { ReduxProvider } from '@/store/providers';
import StoreHydration from '@/components/StoreHydration';
import { getCachedConfig } from '@/lib/configCache';
import { ConfigProvider } from '@/components/ConfigProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coursy - customizable video course platforms',
  description:
    'Create and manage branded online learning platforms with ease. Multi-tenant SaaS solution for organizations to deliver video courses, track progress, and engage learners with customizable themes and comprehensive analytics.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getCachedConfig();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <ConfigProvider config={config}>
          <ReduxProvider>
            {/*<ThemeProvider theme={theme}>*/}
            <StoreHydration />
            <div className="flex min-h-screen flex-col">{children}</div>
            {/*</ThemeProvider>*/}
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
