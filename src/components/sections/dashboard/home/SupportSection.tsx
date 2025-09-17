import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface SupportSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onContactSupport: () => void;
  config: PlatformConfig;
}

export default function SupportSection({
  title = 'Need Help?',
  description = 'Our support team is here to assist you.',
  buttonText = 'Contact Support',
  onContactSupport,
  config,
}: SupportSectionProps) {
  const lighterColor = `${config.colors.primary}1A`; // 10% opacity for background

  return (
    <div className="rounded-lg p-6" style={{ backgroundColor: lighterColor }}>
      <h4 className="text-base font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <button
        onClick={onContactSupport}
        className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity"
        style={{
          backgroundColor: config.colors.primary,
          outlineColor: config.colors.primary,
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
