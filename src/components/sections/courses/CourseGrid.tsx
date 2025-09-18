'use client';

import React, { useState } from 'react';
import CoursesSearchBar from '@/components/sections/courses/CoursesSearchBar';
import CoursesFilterButtons from '@/components/sections/courses/CoursesFilterButtons';
import CourseCard from '@/components/sections/courses/CourseCard';

export default function CourseGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Courses');

  const courses = [
    {
      id: 1,
      title: 'Introduction to Data Science',
      description: 'Learn the basics of data analysis and visualization.',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Advanced Machine Learning',
      description: 'Dive deep into advanced machine learning algorithms.',
      imageUrl:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Business Analytics Fundamentals',
      description: 'Understand core concepts of business analytics.',
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'Digital Marketing Strategies',
      description: 'Develop effective digital marketing campaigns.',
      imageUrl:
        'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop',
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              onViewCourse={() =>
                console.log(`Viewing course: ${course.title}`)
              }
            />
          ))}
        </div>

        {/* No results */}
        {filteredCourses.length === 0 && (
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
