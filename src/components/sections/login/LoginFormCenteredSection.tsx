'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/utils/loginValidation';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/store/hooks/redux';
import { UserResponse } from '@/types/user';

// Constants
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const JWT_EXPIRES_DAYS = 7;

interface LoginFormCenteredSectionProps {
  logoUrl: string;
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkHref: string;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginResponse {
  token: string;
}

export default function LoginFormCenteredSection({
  logoUrl,
  logoText,
  title,
  subtitle,
  submitText,
  loginLinkHref,
}: LoginFormCenteredSectionProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API calls
  const loginUser = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Login failed with status ${response.status}`);
    }

    return response.json();
  };

  const fetchUserData = async (token: string): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        message || `Failed to fetch user data with status ${response.status}`
      );
    }

    return response.json();
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => new Set(prev).add(field));

    let error: string | undefined;
    switch (field) {
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(new Set(['email', 'password']));

    setIsSubmitting(true);

    try {
      // Login user
      const loginData = await loginUser(formData.email, formData.password);

      // Fetch user data
      const userData = await fetchUserData(loginData.token);
      const encodedUserData = btoa(JSON.stringify(userData));

      // Store token and update Redux state
      Cookies.set('jwt', loginData.token, { expires: JWT_EXPIRES_DAYS });
      Cookies.set('userData', encodedUserData, { expires: JWT_EXPIRES_DAYS });

      router.push(loginLinkHref);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general:
          'Unable to connect to the server. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href="/public"
          >
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={40}
                height={40}
                priority
                className="rounded"
              />
            )}
            <span>{logoText}</span>
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {errors.general && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  autoComplete="email"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touched.has('email') && errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="email"
                  name="email"
                  placeholder="john.doe@acme.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.has('email') && errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  autoComplete="new-password"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touched.has('password') && errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  onBlur={handleBlur('password')}
                />
                {touched.has('password') && errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-lg bg-[var(--primary-600)] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--primary-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-600)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                type="submit"
                style={{
                  backgroundColor:
                    isSubmitting || errors ? '#9CA3AF' : 'var(--color-primary)',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
