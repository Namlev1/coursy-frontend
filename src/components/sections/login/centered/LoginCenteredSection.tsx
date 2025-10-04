import { getCachedConfig } from '@/lib/configCache';
import LoginFormCentered from '@/components/sections/login/centered/LoginFormCentered';

export interface LoginCenteredProps {
  logoUrl: string;
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkHref: string;
}
export default async function LoginCenteredSection(props: LoginCenteredProps) {
  const config = await getCachedConfig();

  return <LoginFormCentered {...props} config={config} />;
}
