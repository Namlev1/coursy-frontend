import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface NavbarLogoProps {
  logoUrl: string | null;
  logoText: string;
  isLogoVisible?: boolean;
}

export default function NavbarLogo({
  logoUrl,
  logoText,
  isLogoVisible = true,
}: NavbarLogoProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/public" className="flex items-center gap-2">
        {isLogoVisible && (
          <Image src={logoUrl} alt={'Company logo'} width={36} height={36} />
        )}
        <h1 className="text-xl font-bold text-gray-900">{logoText}</h1>
      </Link>
    </div>
  );
}
