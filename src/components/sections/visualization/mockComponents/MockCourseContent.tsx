'use client';

import React from 'react';
import { Duration } from 'luxon';
import { Video } from '@/types/video';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface MockCourseContentProps {
  formData: PlatformFormData;
}

export default function MockCourseContent({
  formData,
}: MockCourseContentProps) {
  const videos: Video[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      fileName: 'intro-to-html.mp4',
      path: '/videos/courses/web-dev-101/intro-to-html.mp4',
      course: '550e8400-e29b-41d4-a716-446655440100',
      userId: '550e8400-e29b-41d4-a716-446655440200',
      fileSize: 45678901,
      uploadedAt: new Date('2024-10-15T10:30:00Z'),
      duration: 630,
      title: 'Introduction to HTML',
      description:
        'Learn the basics of HTML including tags, elements, and document structure.',
      thumbnail:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      fileName: 'css-fundamentals.mp4',
      path: '/videos/courses/web-dev-101/css-fundamentals.mp4',
      course: '550e8400-e29b-41d4-a716-446655440100',
      userId: '550e8400-e29b-41d4-a716-446655440200',
      fileSize: 52341234,
      uploadedAt: new Date('2024-10-16T14:20:00Z'),
      duration: 720,
      title: 'CSS Fundamentals',
      description:
        'Master CSS selectors, properties, and styling techniques to make your websites beautiful.',
      thumbnail:
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      fileName: 'javascript-basics.mp4',
      path: '/videos/courses/web-dev-101/javascript-basics.mp4',
      course: '550e8400-e29b-41d4-a716-446655440100',
      userId: '550e8400-e29b-41d4-a716-446655440200',
      fileSize: 67890123,
      uploadedAt: new Date('2024-10-17T09:45:00Z'),
      duration: 900,
      title: 'JavaScript Basics',
      description:
        'Get started with JavaScript programming including variables, functions, and DOM manipulation.',
      thumbnail:
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div
      className="rounded-lg shadow-md"
      style={{ backgroundColor: formData.colors.background }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: `${formData.colors.textSecondary}20` }}
      >
        <h3
          className="text-xl font-bold"
          style={{ color: formData.colors.textPrimary }}
        >
          Course Content
        </h3>
      </div>

      {/* Video List */}
      <div
        className="divide-y"
        style={{ borderColor: `${formData.colors.textSecondary}20` }}
      >
        {videos.map((video, index) => {
          const isCurrentlyPlaying = index === 0;
          const isPreview = true;
          return (
            <div
              key={video.id}
              className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
                isCurrentlyPlaying
                  ? ''
                  : isPreview
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: isCurrentlyPlaying
                  ? `${formData.colors.primary}10`
                  : 'transparent',
              }}
            >
              {/* Video Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `${video.thumbnail}`,
                  backgroundColor: `${formData.colors.primary}20`,
                  color:
                    isCurrentlyPlaying || !isPreview
                      ? formData.colors.primary
                      : formData.colors.textSecondary,
                }}
              >
                {isCurrentlyPlaying && (
                  <div className="w-8 h-8 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                    </svg>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="flex-grow">
                <p
                  className={`font-semibold ${isCurrentlyPlaying ? '' : 'font-medium'}`}
                  style={{
                    color: isCurrentlyPlaying
                      ? formData.colors.primary
                      : formData.colors.textPrimary,
                  }}
                >
                  {video.title}
                </p>
                <p
                  style={{
                    color: isCurrentlyPlaying
                      ? `${formData.colors.primary}80`
                      : formData.colors.textSecondary,
                  }}
                >
                  {Duration.fromObject({ seconds: video.duration }).toFormat(
                    video.duration >= 3600 ? 'h:mm:ss' : 'm:ss'
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
