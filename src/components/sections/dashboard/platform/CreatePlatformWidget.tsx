'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postPlatform } from '@/lib/apiClient';
import { PlatformRequest } from '@/types/platform';
import { Colors } from 'picocolors/types';
import { PlatformConfig } from '@/types/platformConfig';

interface BasicInfo {
  name: string;
  description: string;
}

export default function CreatePlatformWidget() {
  const router = useRouter();

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: '',
    description: '',
  });

  const [themeSettings, setThemeSettings] = useState<
    Omit<PlatformConfig, 'navbarConfig' | 'footerItems'>
  >({
    courseListLayout: 'Grid',
    videoPlayerType: 'Minimal',
    colors: {
      primary: '#1383eb',
      secondary: '#f97316',
      tertiary: '#8b5cf6',
      background: '#f8fafc',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Combine all states into the expected API format
    const formData: PlatformRequest = {
      ...basicInfo,
      config: {
        ...themeSettings,
      },
    };

    try {
      await postPlatform(formData);
      router.push('/dashboard');
    } catch (error) {
      // todo show error in UI
      console.error('Error submitting form:', error);
    }
  };

  // Handlers for each state
  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setThemeSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (colorType: keyof Colors, value: string) => {
    setThemeSettings((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value,
      },
    }));
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-7 text-gray-900">
          Create a New Platform
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure the details for your new course platform.
        </p>
      </div>

      <div className="border-t border-gray-200 p-6">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Platform Title */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Platform Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                name="name"
                value={basicInfo.name}
                onChange={handleBasicInfoChange}
                placeholder="e.g. Innovate & Learn"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={basicInfo.description}
                onChange={handleBasicInfoChange}
                rows={3}
                placeholder="A short description of your platform."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Layout Options */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="courseListLayout"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course List Layout
              </label>
              <div className="mt-2">
                <select
                  id="courseListLayout"
                  name="courseListLayout"
                  value={themeSettings.courseListLayout}
                  onChange={handleThemeChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="Grid">Grid</option>
                  <option value="List">List</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="videoPlayerType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Video Player Type
              </label>
              <div className="mt-2">
                <select
                  id="videoPlayerType"
                  name="videoPlayerType"
                  value={themeSettings.videoPlayerType}
                  onChange={handleThemeChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="Minimal">Minimal</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Branding Colors */}
          <div>
            <h4 className="text-base font-semibold leading-7 text-gray-900">
              Branding Colors
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Customize the look and feel of your platform.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {[
                { key: 'primary' as const, label: 'Primary' },
                { key: 'secondary' as const, label: 'Secondary' },
                { key: 'tertiary' as const, label: 'Tertiary' },
                { key: 'background' as const, label: 'Background' },
                { key: 'textPrimary' as const, label: 'Text Primary' },
                { key: 'textSecondary' as const, label: 'Text Secondary' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <input
                    type="color"
                    id={`${key}-color`}
                    value={themeSettings.colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="h-10 w-10 rounded-full border-gray-300 p-0 cursor-pointer"
                  />
                  <label
                    htmlFor={`${key}-color`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-x-3 border-t border-gray-900/10 pt-6">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Create Platform
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
