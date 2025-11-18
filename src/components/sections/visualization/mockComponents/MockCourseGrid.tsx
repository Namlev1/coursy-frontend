'use client';

import React from 'react';
import { Course } from '@/types/course';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import Link from 'next/link';
import MockCoursesSearchBar from '@/components/sections/visualization/mockComponents/MockCourseSearchBar';

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
          <MockCoursesSearchBar
            placeholder="Search for courses..."
            onSearch={() => {}}
            formData={formData}
          />
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="h-40 w-full overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url("${course.imageUrl}")` }}
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-bold text-slate-800">
                  {course.name}
                </h3>
                <p className="mt-1 flex-grow text-sm text-slate-600">
                  {course.description}
                </p>
                <Link
                  className="mt-4 w-full rounded-full py-2 px-4 text-sm font-semibold transition-colors text-center"
                  style={{
                    backgroundColor: `${formData.colors.primary}15`,
                    color: formData.colors.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${formData.colors.primary}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${formData.colors.primary}15`;
                  }}
                  href={'/#'}
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
