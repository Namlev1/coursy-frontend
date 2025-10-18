'use client';

import React from 'react';
import CoursesSearchBar from '@/components/sections/courses/CoursesSearchBar';
import { Course } from '@/types/course';
import CourseCard from '@/components/sections/courses/CourseCard';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface MockCourseGridProps {
  formData: PlatformFormData;
}

export default function MockCourseGrid({ formData }: MockCourseGridProps) {
  const courses: Course[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Introduction to Web Development',
      description:
        'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
      imageUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Advanced React Patterns',
      description:
        'Master advanced React concepts including hooks, context, and performance optimization.',
      imageUrl:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Database Design & SQL',
      description:
        'Understand relational databases, normalization, and write efficient SQL queries.',
      imageUrl:
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'UI/UX Design Principles',
      description:
        'Create beautiful and user-friendly interfaces with modern design principles.',
      imageUrl:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Cloud Architecture with AWS',
      description:
        'Build scalable cloud applications using AWS services and best practices.',
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <CoursesSearchBar
            placeholder="Search for courses..."
            onSearch={() => {}}
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              name={course.name}
              description={course.description}
              imageUrl={course.imageUrl}
              onViewCourse={() => {}}
              courseId={course.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
