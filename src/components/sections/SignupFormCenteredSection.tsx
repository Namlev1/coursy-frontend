import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { TenantTheme } from '@/types/tenant';

interface SignupFormCenteredSectionProps {
  logoUrl: string;
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkText: string;
  loginLinkHref: string;
  theme: TenantTheme;
}

export default function SignupFormCenteredSection({
                                                    logoUrl,
                                                    logoText,
                                                    title,
                                                    subtitle,
                                                    submitText,
                                                    loginLinkText,
                                                    loginLinkHref,
                                                    theme,
                                                  }: SignupFormCenteredSectionProps) {

  // Server Action for form handling
  async function handleSignup(formData: FormData) {
    'use server';

    const organizationName = formData.get('organizationName') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Basic server-side validation
    if (!organizationName || !firstName || !lastName || !email || !password) {
      // In a real app, you'd handle errors properly (maybe with useFormState)
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    try {
      // Your signup logic here - database operations, etc.
      // const user = await createUser({ organizationName, firstName, lastName, email, password });

      // Mock successful signup
      console.log('Creating user:', { organizationName, firstName, lastName, email });

      // Redirect on success
      redirect('/dashboard');
    } catch (error) {
      // Handle signup errors
      throw new Error('Signup failed. Please try again.');
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href="/"
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
          <form action={handleSignup} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="organizationName"
              >
                Organization name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="organizationName"
                  name="organizationName"
                  placeholder="Acme Inc."
                  required
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="firstName"
                >
                  Admin first name
                </label>
                <div className="mt-2">
                  <input
                    autoComplete="given-name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="lastName"
                >
                  Admin last name
                </label>
                <div className="mt-2">
                  <input
                    autoComplete="family-name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    type="text"
                  />
                </div>
              </div>
            </div>

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
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="email"
                  name="email"
                  placeholder="john.doe@acme.com"
                  required
                  type="email"
                />
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
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  autoComplete="new-password"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  type="password"
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-lg bg-[var(--primary-600)] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--primary-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-600)]"
                type="submit"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {submitText}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {`${loginLinkText} `}
            <Link
              className="font-semibold leading-6 text-[var(--primary-600)] hover:text-[var(--primary-500)]"
              href={loginLinkHref}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}