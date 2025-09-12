'use client';

import { useState } from 'react';

interface PlatformFormData {
  title: string;
  description: string;
  courseLayout: 'Grid' | 'List';
  videoPlayerType: 'Minimal' | 'Advanced';
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
}

interface CreatePlatformWidgetProps {
  onSubmit?: (data: PlatformFormData) => void;
  onCancel?: () => void;
}

export default function CreatePlatformWidget({
  onSubmit,
  onCancel,
}: CreatePlatformWidgetProps) {
  const [formData, setFormData] = useState<PlatformFormData>({
    title: '',
    description: '',
    courseLayout: 'Grid',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (
    colorType: keyof PlatformFormData['colors'],
    value: string
  ) => {
    setFormData((prev) => ({
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Platform Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Platform Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
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
                value={formData.description}
                onChange={handleInputChange}
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
                htmlFor="courseLayout"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course List Layout
              </label>
              <div className="mt-2">
                <select
                  id="courseLayout"
                  name="courseLayout"
                  value={formData.courseLayout}
                  onChange={handleInputChange}
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
                  value={formData.videoPlayerType}
                  onChange={handleInputChange}
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
                    value={formData.colors[key]}
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
              type="button"
              onClick={onCancel}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
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
