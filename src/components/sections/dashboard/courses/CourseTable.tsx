'use client';

import React from 'react';
import { PlatformConfig } from '@/types/platformConfig';
import { Course } from '@/types/course';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { useRouter } from 'next/navigation';

interface CourseTableProps {
  courses: Course[];
  config: PlatformConfig;
}

export default function CourseTable({ courses, config }: CourseTableProps) {
  const router = useRouter();

  const handleManageClick = (courseId: string) => {
    router.push('/dashboard/courses/' + courseId);
  };

  const getContentDescription = (course: Course) => {
    /*    if (course.videoCount) {
      return `${course.videoCount} Videos`;
    }
    return `${course.episodeCount} Episodes`;*/
    return 'description xd';
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead
                style={{
                  color: config.colors.textPrimary,
                  backgroundColor: `${config.colors.primary}40`,
                }}
              >
                <tr>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: config.colors.textSecondary }}
                    scope="col"
                  >
                    Course Name
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: config.colors.textSecondary }}
                    scope="col"
                  >
                    Episodes / Videos
                  </th>
                  <th className="relative px-6 py-4" scope="col">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody
                className="divide-y divide-slate-200 dark:divide-slate-700"
                style={{ backgroundColor: config.colors.background }}
              >
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm font-medium"
                      style={{ color: config.colors.textPrimary }}
                    >
                      {course.name}
                    </td>
                    <td
                      className="whitespace-nowrap px-6 py-4 text-sm"
                      style={{ color: config.colors.textSecondary }}
                    >
                      {getContentDescription(course)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleManageClick(course.id)}
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: `${config.colors.primary}20`,
                          color: config.colors.primary,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${config.colors.primary}30`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${config.colors.primary}20`;
                        }}
                      >
                        Manage
                        <Icon path={mdiArrowRight} size={1} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
