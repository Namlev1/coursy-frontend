import React from 'react';
import { getCachedConfig } from '@/lib/configCache';
import { getUserPlatforms } from '@/lib/apiClient';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default async function PlatformsTableSection() {
  const config = await getCachedConfig();
  const platforms = await getUserPlatforms();
  console.log(platforms);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Platforms
        </h3>
        <Link
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity"
          style={{
            backgroundColor: config.colors.primary,
            outlineColor: config.colors.primary,
          }}
          href={ROUTES.NEW_PLATFORM.path}
        >
          Create Platform
        </Link>
      </div>
      <div className="border-t border-gray-200">
        {platforms.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
                      href={`http://${platform.subdomain}.coursy.com`}
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: config.colors.primary }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.subdomain}.coursy.com
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      className="hover:opacity-80 transition-opacity"
                      style={{ color: config.colors.primary }}
                    >
                      Go to Platform
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              No platforms created yet.
            </p>
            <Link
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: config.colors.primary }}
              href={ROUTES.NEW_PLATFORM.path}
            >
              Create Your First Platform
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
