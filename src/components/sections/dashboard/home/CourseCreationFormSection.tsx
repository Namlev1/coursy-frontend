import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';

interface CourseCreationFormSectionProps {
  config: PlatformConfig;
}

export default function CourseCreationFormSection({
  config,
}: CourseCreationFormSectionProps) {
  const inputStyle = {
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  } as React.CSSProperties;

  const focusStyle = `focus:ring-2 focus:border-transparent`;
  const ringColor = `focus:ring-[${config.colors.primary}]`;

  return (
    <form>
      {/* Course Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Course Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Title - Full Width */}
            <div className="md:col-span-2">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="course-title"
              >
                Course title
              </label>
              <input
                id="course-title"
                type="text"
                className={`w-full rounded-md border transition ${focusStyle} ${ringColor}`}
                style={inputStyle}
                placeholder="e.g., Introduction to Web Development"
                required
              />
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
                className={`w-full rounded-md border transition ${focusStyle} ${ringColor}`}
                style={inputStyle}
                placeholder="A brief summary of what this course is about."
                rows={4}
                required
              />
            </div>

            {/* Category - Half Width */}
            <div>
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                className={`w-full rounded-md border transition ${focusStyle} ${ringColor}`}
                style={inputStyle}
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          className="font-semibold rounded-md px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="font-semibold rounded-md px-6 py-2 text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: config.colors.primary }}
        >
          Create Course
        </button>
      </div>
    </form>
  );
}
