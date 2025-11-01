import SignupFormCenteredSection from '@/components/sections/signup/SignupFormCenteredSection';
import { getCachedConfig } from '@/lib/configCache';
import { getLogo, getPlatformById } from '@/lib/apiClient';
import { getPlatformId } from '@/lib/headerUtils';
import { ROUTES } from '@/lib/routes';

export default async function SignupPage() {
  const config = await getCachedConfig();
  const platformId = await getPlatformId();
  const platform = await getPlatformById(platformId);
  return (
    <div>
      <SignupFormCenteredSection
        logoUrl={getLogo(platformId)}
        logoText={''}
        title={platform.name}
        subtitle={'Create an account'}
        submitText={'Sign up'}
        loginLinkText={'Already have an account?'}
        loginLinkHref={ROUTES.LOGIN.path}
        config={config}
        platformId={platformId}
      />
    </div>
  );
}
