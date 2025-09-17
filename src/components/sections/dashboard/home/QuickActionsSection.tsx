import React from 'react';
import Link from 'next/link';
import { PlatformConfig } from '@/types/platformConfig';

interface ActionButton {
  label: string;
  href: string;
  primary: boolean;
  icon: string;
}

interface QuickActionsSectionProps {
  title: string;
  actions: ActionButton[];
  config: PlatformConfig;
}

export default function QuickActionsSection({
  title,
  actions,
  config,
}: QuickActionsSectionProps) {
  const getPlusIcon = () => (
    <svg
      className="mr-2 -ml-1"
      fill="currentColor"
      height="20"
      viewBox="0 0 256 256"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
  );

  const getActionElement = (action: ActionButton, index: number) => {
    const commonClasses =
      'flex items-center justify-center rounded-full h-12 px-6 text-base font-semibold shadow-sm transition-colors';

    const primaryClasses = `${commonClasses} text-white hover:bg-opacity-90`;
    const secondaryClasses = `${commonClasses} bg-white border border-gray-300 text-gray-800 hover:bg-gray-50`;

    const content = (
      <>
        {action.icon === 'plus' && getPlusIcon()}
        <span>{action.label}</span>
      </>
    );

    return (
      <Link
        key={index}
        href={action.href}
        className={action.primary ? primaryClasses : secondaryClasses}
        style={
          action.primary
            ? { backgroundColor: config.colors.primary }
            : undefined
        }
      >
        {content}
      </Link>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex gap-4">
        {actions.map((action, index) => getActionElement(action, index))}
      </div>
    </div>
  );
}
