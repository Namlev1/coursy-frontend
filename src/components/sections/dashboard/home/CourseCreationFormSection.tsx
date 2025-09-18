'use client';

import React, { useState } from 'react';
import { PlatformConfig } from '@/types/platformConfig';
import apiClient from '@/api/client';
import axios from 'axios';
import { validateDescription, validateName } from '@/utils/courseValidation';
import { useRouter } from 'next/navigation';

interface CourseCreationFormSectionProps {
  config: PlatformConfig;
}

interface FormData {
  name: string;
  description: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  general?: string;
}

export default function CourseCreationFormSection({
  config,
}: CourseCreationFormSectionProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle = {
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  } as React.CSSProperties;

  // API calls
  const createCourse = async (
    name: string,
    description: string
  ): Promise<void> => {
    try {
      await apiClient.post('/api/courses', {
        name: name.trim(),
        description: description.trim(),
      });
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || 'Failed to create course';
        setErrors({
          general: message,
        });
        throw new Error(message);
      }
      throw error;
    }
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleTextareaChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => new Set(prev).add(field));

    let error: string | undefined;
    switch (field) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'description':
        error = validateDescription(formData.description);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateName(formData.name);
    const descriptionError = validateDescription(formData.description);

    if (nameError) newErrors.name = nameError;
    if (descriptionError) newErrors.description = descriptionError;

    setErrors(newErrors);
    setTouched(new Set(['name', 'description']));

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear general error
    setErrors((prev) => ({ ...prev, general: undefined }));

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createCourse(formData.name, formData.description);

      // Success - you might want to redirect or show success message
      console.log('Course created successfully!');
      router.push('/dashboard/courses');

      // Reset form
      setFormData({ name: '', description: '' });
      setTouched(new Set());
      setErrors({});
    } catch (error) {
      console.error('Course creation error:', error);
      setErrors({
        general:
          'Unable to connect to the server. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* General Error Display */}
      {errors.general && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {errors.general}
        </div>
      )}

      {/* Course Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Course Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Name - Full Width */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="course-name"
              >
                Course name
              </label>
              <input
                id="course-name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                onBlur={handleBlur('name')}
                className={`w-full rounded-md border transition px-3 py-2 ${
                  touched.has('name') && errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                }`}
                style={inputStyle}
                placeholder="e.g., Introduction to Web Development"
                required
              />
              {touched.has('name') && errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Course Description - Full Width */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="course-description"
              >
                Course description
              </label>
              <textarea
                id="course-description"
                value={formData.description}
                onChange={handleTextareaChange('description')}
                onBlur={handleBlur('description')}
                className={`w-full rounded-md border transition px-3 py-2 ${
                  touched.has('description') && errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                }`}
                style={inputStyle}
                placeholder="A brief summary of what this course is about."
                rows={4}
                required
              />
              {touched.has('description') && errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          className="font-semibold rounded-md px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors disabled:opacity-50"
          disabled={true}
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="font-semibold rounded-md px-6 py-2 text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: isSubmitting ? '#9CA3AF' : config.colors.primary,
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Course...' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}
