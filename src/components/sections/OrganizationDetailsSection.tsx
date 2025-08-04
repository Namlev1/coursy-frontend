import React from 'react';
import { Theme } from '@/types/tenant';

interface OrganizationDetail {
  label: string;
  value:
    | string
    | { type: 'badge'; text: string; variant: 'green' | 'blue' | 'gray' };
}

interface OrganizationDetailsSectionProps {
  title: string;
  details: OrganizationDetail[];
  theme: Theme;
}

export default function OrganizationDetailsSection({
  title,
  details,
  theme,
}: OrganizationDetailsSectionProps) {
  const renderValue = (value: string | any) => {
    if (typeof value === 'object' && value.type === 'badge') {
      const badgeColors = {
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        gray: 'bg-gray-100 text-gray-800',
      };

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[value.variant] || badgeColors.gray}`}
        >
          {value.text}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          {title}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <dt className="text-sm font-medium text-gray-500">
                {detail.label}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {renderValue(detail.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
