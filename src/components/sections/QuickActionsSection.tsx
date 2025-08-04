import React from 'react';
import { Theme } from '@/types/tenant';

interface ActionButton {
  label: string;
  href?: string;
  primary?: boolean;
  icon?: string;
}

interface QuickActionsSectionProps {
  title: string;
  actions: ActionButton[];
  theme: Theme;
}

export default function QuickActionsSection({
  title,
  actions,
  theme,
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

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex gap-4">
        {actions.map((action, index) =>
          action.primary ? (
            <button
              key={index}
              className="flex items-center justify-center rounded-full h-12 px-6 text-white text-base font-semibold shadow-sm hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: theme.colors.primary }}
            >
              {action.icon === 'plus' && getPlusIcon()}
              <span>{action.label}</span>
            </button>
          ) : (
            <button
              key={index}
              className="flex items-center justify-center rounded-full h-12 px-6 bg-white border border-gray-300 text-gray-800 text-base font-semibold shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span>{action.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
