'use client';

import { useState } from 'react';
import { PlatformConfig } from '@/types/platformConfig';
import { Course } from '@/types/course';

interface CourseFormProps {
  config: PlatformConfig;
  course: Course;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
}

export default function CourseForm({
  config,
  course,
  onTitleChange,
  onDescriptionChange,
}: CourseFormProps) {
  const [title, setTitle] = useState(course.name);
  const [description, setDescription] = useState(course.description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    onDescriptionChange?.(newDescription);
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="course-title"
          style={{ color: config.colors.textPrimary }}
        >
          Course Title
        </label>
        <input
          className="form-input w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
              '--tw-ring-color': config.colors.primary,
            } as React.CSSProperties
          }
          id="course-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter course title"
          onFocus={(e) => {
            e.target.style.borderColor = config.colors.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = config.colors.secondary;
          }}
        />
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
          className="form-textarea w-full border rounded-lg px-4 py-3 transition-all focus:ring-2 focus:outline-none resize-vertical"
          style={
            {
              backgroundColor: config.colors.background,
              borderColor: config.colors.secondary,
              color: config.colors.textPrimary,
              '--tw-ring-color': config.colors.primary,
            } as React.CSSProperties
          }
          id="course-description"
          rows={6}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter course description"
          onFocus={(e) => {
            e.target.style.borderColor = config.colors.primary;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = config.colors.secondary;
          }}
        />
      </div>
    </div>
  );
}
