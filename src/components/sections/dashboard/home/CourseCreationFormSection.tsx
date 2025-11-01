'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createCourse } from '@/lib/apiClient';
import { VALIDATION_LIMITS } from '@/lib/validation/constants';
import { PlatformConfig } from '@/types/platformConfig';
import { ROUTES } from '@/lib/routes';
import ImageUploadField from '@/components/sections/dashboard/platform/ImageUploadField';

const courseSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_LIMITS.COURSE.NAME.MIN_LENGTH, 'Course name is required')
    .max(VALIDATION_LIMITS.COURSE.NAME.MAX_LENGTH, 'Name too long'),
  description: z
    .string()
    .min(
      VALIDATION_LIMITS.COURSE.DESCRIPTION.MIN_LENGTH,
      'Description is required'
    )
    .max(
      VALIDATION_LIMITS.COURSE.DESCRIPTION.MAX_LENGTH,
      'Description too long'
    ),
  image: typeof FileList !== 'undefined' ? z.instanceof(FileList) : z.any(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

interface CourseCreationFormSectionProps {
  config: PlatformConfig;
}

export default function CourseCreationFormSection({
  config,
}: CourseCreationFormSectionProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      if (!data.image?.[0]) {
        setError('root', {
          message: 'Course image is required',
        });
        return;
      }

      const { id } = await createCourse(
        data.name,
        data.description,
        data.image[0]
      );

      router.push(`${ROUTES.COURSES_MANAGEMENT.path}/${id}`);
    } catch (error) {
      setError('root', {
        message:
          error instanceof Error ? error.message : 'Failed to create course',
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-7 text-gray-900">
          Create a New Course
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure the details for your new course.
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

          {/* Course Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Course Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                {...register('name')}
                placeholder="e.g. Introduction to Web Development"
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
                rows={4}
                placeholder="A brief summary of what this course is about."
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

          {/* Image Upload */}
          <ImageUploadField
            id="image"
            label="Course Image"
            maxSize="10MB"
            register={register}
            errors={errors}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-x-3 border-t border-gray-900/10 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isSubmitting
                  ? '#9CA3AF'
                  : config.colors.primary,
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}