import React from 'react';
import { Theme } from '@/types/tenant';

interface CourseCreationFormSectionProps {
  theme: Theme;
}

export default function CourseCreationFormSection({
  theme,
}: CourseCreationFormSectionProps) {
  const inputStyle = {
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  } as React.CSSProperties;

  const focusStyle = `focus:ring-2 focus:border-transparent`;
  const ringColor = `focus:ring-[${theme.colors.primary}]`;

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

        {/* Course Content Section */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Course Content
          </h2>
          <div className="text-center border-2 border-dashed border-gray-200 rounded-lg p-12">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="text-gray-500"
                fill="currentColor"
                height="32"
                viewBox="0 0 256 256"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-99.51-24.49,48-48a8,8,0,0,0-11.32-11.32L136,87.17V32a8,8,0,0,0-16,0v55.17l-24.49-24.48a8,8,0,0,0-11.32,11.32l48,48A8,8,0,0,0,124.49,119.51Z"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Start building your course
            </h3>
            <p className="mt-1 text-gray-600">
              Upload videos, create modules, and add supplementary materials.
            </p>
            <button
              type="button"
              className="font-semibold rounded-md px-4 py-2 mt-6 text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Add Module
            </button>
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
          style={{ backgroundColor: theme.colors.primary }}
        >
          Create Course
        </button>
      </div>
    </form>
  );
}
