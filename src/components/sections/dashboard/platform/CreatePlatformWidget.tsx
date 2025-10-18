'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { postPlatform } from '@/lib/apiClient';
import { PlatformRequest } from '@/types/platform';
import { CourseListLayout, VideoPlayerType } from '@/types/platformConfig';
import { VALIDATION_LIMITS } from '@/lib/validation/constants';
import VisualizationHomePage from '@/components/sections/visualization/VisualizationHomePage';
import VisualizationCourseList from '@/components/sections/visualization/VisualizationCourseList';
import VisualizationVideoPlayer from '@/components/sections/visualization/VisualizationVideoPlayer';

const platformSchema = z.object({
  name: z
    .string()
    .min(
      VALIDATION_LIMITS.PLATFORM.NAME.MIN_LENGTH,
      'Platform title is required'
    )
    .max(VALIDATION_LIMITS.PLATFORM.NAME.MAX_LENGTH, 'Title too long'),
  subdomain: z
    .string()
    .min(
      VALIDATION_LIMITS.PLATFORM.SUBDOMAIN.MIN_LENGTH,
      'Subdomain is required'
    )
    .max(VALIDATION_LIMITS.PLATFORM.SUBDOMAIN.MAX_LENGTH, 'Subdomain too long')
    .regex(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/, 'Invalid subdomain format')
    .transform((val) => val.toLowerCase().trim()),
  description: z
    .string()
    .min(
      VALIDATION_LIMITS.PLATFORM.DESCRIPTION.MIN_LENGTH,
      'Description is required'
    )
    .max(
      VALIDATION_LIMITS.PLATFORM.DESCRIPTION.MAX_LENGTH,
      'Description too long'
    ),
  courseListLayout: z.enum(CourseListLayout),
  videoPlayerType: z.enum(VideoPlayerType),
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
    tertiary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
    textPrimary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
    textSecondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color'),
  }),
});

export type PlatformFormData = z.infer<typeof platformSchema>;

export default function CreatePlatformWidget() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
    watch,
  } = useForm<PlatformFormData>({
    resolver: zodResolver(platformSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      subdomain: '',
      description: '',
      courseListLayout: CourseListLayout.GRID,
      videoPlayerType: VideoPlayerType.MINIMAL,
      colors: {
        primary: '#1383eb',
        secondary: '#f97316',
        tertiary: '#8b5cf6',
        background: '#f8fafc',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
      },
    },
  });
  
  const formData = watch();

  const onSubmit = async (data: PlatformFormData) => {
    try {
      const formData: PlatformRequest = {
        name: data.name,
        subdomain: data.subdomain,
        description: data.description || '',
        config: {
          courseListLayout: data.courseListLayout,
          videoPlayerType: data.videoPlayerType,
          colors: data.colors,
          navbarConfig: {
            logoUrl: null,
            logoText: '',
            isLogoVisible: false,
            navItems: [],
          },
          footerItems: [],
        },
      };

      await postPlatform(formData);
      router.push('/dashboard');
    } catch (error) {
      setError('root', {
        message:
          error instanceof Error ? error.message : 'Failed to create platform',
      });
    }
  };

  const colorFields = [
    { key: 'primary' as const, label: 'Primary' },
    { key: 'secondary' as const, label: 'Secondary' },
    { key: 'tertiary' as const, label: 'Tertiary' },
    { key: 'background' as const, label: 'Background' },
    { key: 'textPrimary' as const, label: 'Text Primary' },
    { key: 'textSecondary' as const, label: 'Text Secondary' },
  ];

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          {/* Global Error */}
          {errors.root && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errors.root.message}
                  </h3>
                </div>
              </div>
            </div>
          )}

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
                {...register('name')}
                placeholder="e.g. Innovate & Learn"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.name && touchedFields.name
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-blue-600'
                }`}
              />
              {errors.name && touchedFields.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Subdomain */}
          <div>
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Subdomain
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                type="text"
                id="subdomain"
                {...register('subdomain')}
                placeholder="your-platform-name"
                className={`block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.subdomain && touchedFields.subdomain
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-blue-600'
                }`}
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                .coursy.com
              </span>
            </div>
            {errors.subdomain && touchedFields.subdomain && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subdomain.message}
              </p>
            )}
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
                {...register('description')}
                rows={3}
                placeholder="A short description of your platform."
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  errors.description && touchedFields.description
                    ? 'ring-red-300 focus:ring-red-500'
                    : 'ring-gray-300 focus:ring-blue-600'
                }`}
              />
              {errors.description && touchedFields.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
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
                  {...register('courseListLayout')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="Grid">Grid</option>
                  <option value="List">List</option>
                  <option value="Table">Table</option>
                  <option value="Album">Album</option>
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
                  {...register('videoPlayerType')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="Minimal">Minimal</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Branded">Branded</option>
                  <option value="Cinema">Cinema</option>
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
              {colorFields.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <input
                    type="color"
                    id={`colors.${key}`}
                    {...register(`colors.${key}`)}
                    className="h-10 w-10 rounded-full border-gray-300 p-0 cursor-pointer"
                  />
                  <label
                    htmlFor={`colors.${key}`}
                    className="block text-sm font-medium text-gray-900"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization Preview */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold leading-7 text-gray-900">
              Visualization
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Preview the look and feel of your new course platform.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <VisualizationHomePage formData={formData} />
              <VisualizationCourseList formData={formData} />
              <VisualizationVideoPlayer formData={formData} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-x-3 border-t border-gray-900/10 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Platform'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
