import HeroSection from '@/components/sections/hero/HeroSection';
import { getCachedConfig } from '@/lib/configCache';
import { ROUTES } from '@/lib/routes';
import { getHero } from '@/lib/apiClient';
import { getPlatformId } from '@/lib/headerUtils';

export default async function HomePage() {
  const config = await getCachedConfig();
  const platformId = await getPlatformId();

  return (
    <HeroSection
      title={config.heroTitle}
      subtitle={config.heroSubtitle}
      backgroundImage={getHero(platformId)}
      ctaText={config.ctaText}
      ctaHref={ROUTES.SIGNUP.path}
    />
  );
}
