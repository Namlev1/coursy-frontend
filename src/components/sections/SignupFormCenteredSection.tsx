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
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <a
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href="#"
          >
            {/*<Image src={logoText} alt={'Logo'} width={100} height={100}/>*/}
            <span>{logoText}</span>
          </a>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
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
                  required={true}
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
                    required={true}
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
                    autoComplete="family-name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                    id="last-name"
                    name="last-name"
                    placeholder="Doe"
                    required={true}
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
                  required={true}
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
                  required={true}
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
                  autoComplete="new-password"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm h-12 px-4"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="••••••••"
                  required={true}
                  type="password"
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
            <a
              className="font-semibold leading-6 text-[var(--primary-600)] hover:text-[var(--primary-500)]"
              href={loginLinkHref}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
