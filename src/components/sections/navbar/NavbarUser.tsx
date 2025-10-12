'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useConfig } from '@/components/ConfigProvider';
import { ROUTES } from '@/lib/routes';
import { Menu, Transition } from '@headlessui/react';
import { Logout, Person } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/apiClient';
import { logout } from '@/store/slices/authSlice';
import Cookies from 'js-cookie';

export default function NavbarUser() {
  const config = useConfig();
  const authState = useAppSelector((state) => state.auth);
  const colors = config.colors;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logoutUser();
    Cookies.remove('jwt');
    Cookies.remove('refreshToken');
    Cookies.remove('userData');
    dispatch(logout());
    router.refresh();
  };

  function UserAvatar() {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
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
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Person className="mr-3" fontSize="small" />
                    Show Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700 text-left`}
                  >
                    <Logout className="mr-3" fontSize="small" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }

  function LoginSignupButtons() {
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
