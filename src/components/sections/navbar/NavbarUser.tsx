'use client';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks/redux';
import { useConfig } from '@/components/ConfigProvider';
import { ROUTES } from '@/lib/routes';

export default function NavbarUser() {
  const config = useConfig();
  const authState = useAppSelector((state) => state.auth);
  const colors = config.colors;

  function UserAvatar() {
    return (
      <button
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
        aria-label="View notifications"
      >
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
          />
        </svg>
      </button>
    );
  }

  function LoginSignupButtons() {
    const config = useConfig();
    const colors = config.colors;

    return (
      <>
        <Link
          href={ROUTES.LOGIN.path}
          className="hidden sm:flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-sm font-bold transition-colors hover:bg-gray-100"
          style={{ color: colors.textPrimary }}
        >
          Login
        </Link>
        <Link
          href={ROUTES.SIGNUP.path}
          className="flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
          style={{ backgroundColor: colors.primary }}
        >
          Get Started
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {authState.isAuthenticated ? <UserAvatar /> : <LoginSignupButtons />}
    </div>
  );
}
