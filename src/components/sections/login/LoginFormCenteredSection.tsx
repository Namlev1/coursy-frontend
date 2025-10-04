'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { fetchUserData, loginUser } from '@/lib/apiClient';
import { DEFAULT_ERROR_MESSAGE } from '@/lib/apiClient/errors';
import { VALIDATION_LIMITS } from '@/lib/validation/constants';
import { ROUTES } from '@/lib/routes';

const JWT_EXPIRES_DAYS = 7;

interface LoginFormCenteredSectionProps {
  logoUrl: string;
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkHref: string;
}

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .min(
      VALIDATION_LIMITS.EMAIL.MIN_LENGTH,
      `Email must be at least ${VALIDATION_LIMITS.EMAIL.MIN_LENGTH} characters long`
    )
    .max(
      VALIDATION_LIMITS.EMAIL.MAX_LENGTH,
      `Email must be no more than ${VALIDATION_LIMITS.EMAIL.MAX_LENGTH} characters`
    )
    .email('Please enter a valid email address')
    .transform((val) => val.trim()),

  password: z
    .string()
    .min(
      VALIDATION_LIMITS.PASSWORD.MIN_LENGTH,
      `Password must be at least ${VALIDATION_LIMITS.PASSWORD.MIN_LENGTH} characters`
    )
    .max(
      VALIDATION_LIMITS.PASSWORD.MAX_LENGTH,
      `Password cannot exceed ${VALIDATION_LIMITS.PASSWORD.MAX_LENGTH} characters`
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginFormCenteredSection({
  logoUrl,
  logoText,
  title,
  subtitle,
  submitText,
  loginLinkHref,
}: LoginFormCenteredSectionProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const loginData = await loginUser(data.email, data.password);

      // Fetch user data
      const userData = await fetchUserData(loginData.token);
      const encodedUserData = btoa(JSON.stringify(userData));

      // Store token and update Redux state
      Cookies.set('jwt', loginData.token, { expires: JWT_EXPIRES_DAYS });
      Cookies.set('userData', encodedUserData, { expires: JWT_EXPIRES_DAYS });

      router.push(loginLinkHref);
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href={ROUTES.DASHBOARD.path}
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
          {errors.root && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {errors.root.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email')}
                  autoComplete="email"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touchedFields.email && errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="email"
                  name="email"
                  placeholder="john.doe@acme.com"
                  type="email"
                />
                {touchedFields.email && errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
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
                  {...register('password')}
                  autoComplete="new-password"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touchedFields.password && errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
                {touchedFields.password && errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
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
