import LoginCenteredSection from '@/components/sections/login/centered/LoginCenteredSection';
import { getLogo, getPlatformById } from '@/lib/apiClient';
import { ROUTES } from '@/lib/routes';
import { getPlatformId } from '@/lib/headerUtils';

export default async function LoginPage() {
  const platformId = await getPlatformId();
  const platform = await getPlatformById(platformId);

  return (
    <div>
      <LoginCenteredSection
        logoUrl={getLogo(platformId)}
        logoText={''}
        title={platform.name}
        subtitle={'Login'}
        submitText={'Login'}
        loginLinkHref={ROUTES.DASHBOARD.path}
      />
    </div>
  );
}
