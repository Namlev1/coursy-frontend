'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Course, CourseUpdateRequest } from '@/types/course';
import { useConfig } from '@/components/ConfigProvider';
import { useEffect, useState } from 'react';
import { updateCourse } from '@/lib/apiClient';

const courseUpdateSchema = z.object({
  name: z
    .string()
    .min(5, 'Course title must be at least 5 characters')
    .max(50, 'Course title must not exceed 50 characters'),
  description: z
    .string()
    .min(1, 'Course description must be at least 1 character')
    .max(4000, 'Course description must not exceed 4000 characters'),
});

type CourseUpdateFormData = z.infer<typeof courseUpdateSchema>;

interface CourseFormProps {
  course: Course;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
}

export default function CourseForm({
  course,
  onTitleChange,
  onDescriptionChange,
}: CourseFormProps) {
  const config = useConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CourseUpdateFormData>({
    resolver: zodResolver(courseUpdateSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
    },
  });

  const name = watch('name');
  const description = watch('description');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    onTitleChange?.(name);
  }, [name, onTitleChange]);

  useEffect(() => {
    onDescriptionChange?.(description);
  }, [description, onDescriptionChange]);

  const onSubmit = async () => {
    const dto: CourseUpdateRequest = {
      name,
      description,
    };
    await updateCourse(dto, course.id);
    setSuccessMessage('Course updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="course-title"
          style={{ color: config.colors.textPrimary }}
        >
          Course Title
        </label>
        <input
          {...register('name')}
          className="form-input w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: errors.name ? '#ef4444' : config.colors.primary,
              color: config.colors.textPrimary,
              '--tw-ring-color': config.colors.primary,
            } as React.CSSProperties
          }
          id="course-title"
          type="text"
          placeholder="Enter course title"
          onFocus={(e) => {
            e.target.style.borderColor = config.colors.primary;
          }}
          onBlur={(e) => {
            if (!errors.name) {
              e.target.style.borderColor = config.colors.secondary;
            }
          }}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="course-description"
          style={{ color: config.colors.textPrimary }}
        >
          Course Description
        </label>
        <textarea
          {...register('description')}
          className="form-textarea w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none resize-vertical"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: errors.description
                ? '#ef4444'
                : config.colors.primary,
              color: config.colors.textPrimary,
              '--tw-ring-color': config.colors.primary,
            } as React.CSSProperties
          }
          id="course-description"
          rows={6}
          placeholder="Enter course description"
          onFocus={(e) => {
            e.target.style.borderColor = config.colors.primary;
          }}
          onBlur={(e) => {
            if (!errors.description) {
              e.target.style.borderColor = config.colors.secondary;
            }
          }}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        {successMessage && (
          <p className="text-sm text-center">{successMessage}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white text-sm font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: config.colors.primary,
          }}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
