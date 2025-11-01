'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { useConfig } from '@/components/ConfigProvider';
import { addText } from '@/lib/apiClient/requests/textContent';
import { UUID } from 'node:crypto';
import { TiptapEditor } from '@/app/(main)/dashboard/courses/[courseId]/add/text/tipTap';

const textSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
});

type TextFormData = z.infer<typeof textSchema>;

export default function AddTextForm() {
  const config = useConfig();
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TextFormData>({
    resolver: zodResolver(textSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: TextFormData) => {
    try {
      const textDto = {
        title: data.title,
        content: data.content,
        course: params.courseId as UUID,
      };
      await addText(textDto);
      router.push(`/dashboard/courses/${params.courseId}`);
    } catch (error) {
      // todo show error in ui
      throw error;
    }
  };

  return (
    <>
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: config.colors.textPrimary }}
      >
        Add new Text content
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="text-title"
            style={{ color: config.colors.textPrimary }}
          >
            Title
          </label>
          <input
            {...register('title')}
            className="form-input w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
            style={
              {
                backgroundColor: config.colors.background,
                borderColor: config.colors.secondary,
                color: config.colors.textPrimary,
                '--tw-ring-color': config.colors.primary,
              } as React.CSSProperties
            }
            id="text-title"
            type="text"
            placeholder="e.g., Introduction to Theming"
            onFocus={(e) => {
              e.target.style.borderColor = config.colors.primary;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = config.colors.secondary;
            }}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Content Field with Tiptap */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="text-content"
            style={{ color: config.colors.textPrimary }}
          >
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TiptapEditor
                value={field.value}
                onChange={field.onChange}
                config={config}
              />
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={
              {
                backgroundColor: config.colors.primary,
                color: '#ffffff',
                '--tw-ring-color': config.colors.primary,
              } as React.CSSProperties
            }
            type="submit"
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Add Text Content
          </button>
        </div>
      </form>
    </>
  );
}