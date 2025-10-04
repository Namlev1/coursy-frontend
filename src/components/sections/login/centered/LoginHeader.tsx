import Image from 'next/image';
import Link from 'next/link';

interface LoginHeaderProps {
  logoUrl: string;
  logoText: string;
  logoHref: string;
  title: string;
  subtitle: string;
}

export default function LoginHeader({
  logoUrl,
  logoText,
  logoHref,
  title,
  subtitle,
}: LoginHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <Link
        className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
        href={logoHref}
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
  );
}
