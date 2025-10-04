'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { fetchUserData, loginUser } from '@/lib/apiClient';
import { DEFAULT_ERROR_MESSAGE } from '@/lib/apiClient/errors';
import { VALIDATION_LIMITS } from '@/lib/validation/constants';
import { ROUTES } from '@/lib/routes';
import { LoginCenteredProps } from '@/components/sections/login/centered/LoginCenteredSection';
import { PlatformConfig } from '@/types/platformConfig';
import LoginHeader from '@/components/sections/login/centered/LoginHeader';
import FormInput from '@/components/sections/login/centered/FormInput';
import ErrorAlert from '@/components/sections/login/centered/ErrorAlert';

const JWT_EXPIRES_DAYS = 7;

interface LoginFormCenteredProps extends LoginCenteredProps {
  config: PlatformConfig;
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

export default function LoginFormCentered({
  logoUrl,
  logoText,
  title,
  subtitle,
  submitText,
  loginLinkHref,
  config,
}: LoginFormCenteredProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, isValid },
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
        <LoginHeader
          logoUrl={logoUrl}
          logoText={logoText}
          logoHref={ROUTES.DASHBOARD.path}
          title={title}
          subtitle={subtitle}
        />

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {errors.root && errors.root.message && (
            <ErrorAlert message={errors.root.message} />
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <FormInput
              label="Email address"
              id="email"
              type="email"
              placeholder="john.doe@acme.com"
              error={errors.email?.message}
              touched={touchedFields.email || false}
              register={register('email')}
              primaryColor={config.colors.primary}
              autoComplete="email"
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              touched={touchedFields.password || false}
              register={register('password')}
              primaryColor={config.colors.primary}
              autoComplete="new-password"
            />

            <div>
              <button
                className="flex w-full justify-center rounded-lg px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                type="submit"
                style={{
                  backgroundColor: config.colors.primary,
                  outlineColor: config.colors.primary,
                }}
                disabled={isSubmitting || !isValid}
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
