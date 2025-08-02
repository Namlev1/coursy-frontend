import { TenantTheme } from '@/types/tenant';

interface SignupFormCenteredSectionProps {
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkText: string;
  loginLinkHref: string;
  theme: TenantTheme;
}

export default function SignupFormCenteredSection({
  logoText,
  title,
  subtitle,
  submitText,
  loginLinkText,
  loginLinkHref,
  theme,
}: SignupFormCenteredSectionProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <a
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href="#"
          >
            <svg
              className="h-8 w-8 text-[var(--primary-600)]"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>CourseHub</span>
          </a>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Create your organization
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our platform and start building your course empire.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form action="#" className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="organization-name"
              >
                Organization name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="organization-name"
                  name="organization-name"
                  placeholder="Acme Inc."
                  required=""
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="first-name"
                >
                  Admin first name
                </label>
                <div className="mt-2">
                  <input
                    autoComplete="given-name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                    id="first-name"
                    name="first-name"
                    placeholder="John"
                    required=""
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="last-name"
                >
                  Admin last name
                </label>
                <div className="mt-2">
                  <input
                    autocomplete="family-name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                    id="last-name"
                    name="last-name"
                    placeholder="Doe"
                    required=""
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
                  autocomplete="email"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="email"
                  name="email"
                  placeholder="john.doe@acme.com"
                  required=""
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
                  autocomplete="new-password"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required=""
                  type="password"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="confirm-password"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  autocomplete="new-password"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="••••••••"
                  required=""
                  type="password"
                />
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-lg bg-[var(--primary-600)] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--primary-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-600)]"
                type="submit"
              >
                Create organization
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?
            <a
              className="font-semibold leading-6 text-[var(--primary-600)] hover:text-[var(--primary-500)]"
              href="#"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
