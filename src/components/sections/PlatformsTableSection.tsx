import React from 'react';

interface Platform {
  id: string;
  name: string;
  url: string;
  subdomain: string;
  status: 'active' | 'draft';
}

interface PlatformsTableSectionProps {
  title: string;
  platforms: Platform[];
  createButtonText: string;
  theme: any;
}

export default function PlatformsTableSection({
  title,
  platforms,
  createButtonText,
  theme,
}: PlatformsTableSectionProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          {title}
        </h3>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: theme.colors.primary,
            outlineColor: theme.colors.primary,
          }}
        >
          {createButtonText}
        </button>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-g,ray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                scope="col"
              >
                Platform Name
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                scope="col"
              >
                URL
              </th>
              <th className="relative px-6 py-3" scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {platforms.map((platform) => (
              <tr key={platform.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {platform.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <a
                    className="hover:opacity-80"
                    style={{ color: theme.colors.primary }}
                    href={`https://${platform.url}`}
                  >
                    {platform.url}
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <a
                    className="hover:opacity-80"
                    style={{ color: theme.colors.primary }}
                    href={`https://${platform.url}`}
                  >
                    Go to Platform
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}