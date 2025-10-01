'use client';

import React, { useEffect, useState } from 'react';
import CoursesSearchBar from '@/components/sections/courses/CoursesSearchBar';
import CoursesFilterButtons from '@/components/sections/courses/CoursesFilterButtons';
import { Course } from '@/types/course';
import CourseCard from '@/components/sections/courses/CourseCard';
import { DEFAULT_ERROR_MESSAGE } from '@/lib/apiClient/errors';
import { fetchCourses } from '@/lib/apiClient';
import { UUID } from 'node:crypto';

interface CourseGridProps {
  platformId: UUID;
}

export default function CourseGridSection({ platformId }: CourseGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Courses');

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courses = await fetchCourses(platformId);
        setCourses(courses);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [platformId]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <CoursesSearchBar
            placeholder="Search for courses..."
            onSearch={setSearchQuery}
          />
          <CoursesFilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
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
              onViewCourse={() => console.log(`Viewing course: ${course.name}`)}
              courseId={course.id}
            />
          ))}
        </div>

        {/*No results */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No courses found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
