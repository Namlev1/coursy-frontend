import React from 'react';
import { TenantTheme } from '@/types/tenant';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface HeaderSectionProps {
  logoText: string;
  navigation: Array<{ label: string; href: string; active?: boolean }>;
  theme: TenantTheme;
  isAuthenticated?: boolean;
  user?: User;
}

export default function HeaderSection({
  logoText,
  navigation,
  theme,
  isAuthenticated = false,
  user,
}: HeaderSectionProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-2" href="#">
            <div className="h-7 w-7" style={{ color: theme.colors.primary }}>
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{logoText}</h1>
          </a>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                item.active ? 'text-primary-600 font-semibold' : 'text-gray-500'
              }`}
              style={{
                color: item.active ? theme.colors.primary : undefined,
              }}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              {/* Notifications */}
              <button
                className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={
                  {
                    '--tw-ring-color': theme.colors.primary,
                  } as React.CSSProperties
                }
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>

              {/* User Avatar */}
              <div className="relative">
                <button className="flex items-center">
                  <img
                    alt={`${user.name} avatar`}
                    className="h-9 w-9 rounded-full object-cover"
                    src={user.avatar}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Login/Register buttons for non-authenticated */}
              <button
                className="hidden sm:inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-transparent text-sm font-bold transition-colors hover:bg-gray-100"
                style={{ color: theme.colors.textPrimary }}
              >
                <span className="truncate">Login</span>
              </button>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span className="truncate">Get Started</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
