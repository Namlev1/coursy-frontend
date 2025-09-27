'use client';

import React from 'react';

// Platform configuration interfaces
export interface PlatformConfig {
  colors: Colors;
  navbarConfig: NavbarConfig;
  footerItems: FooterItem[];
  courseListLayout: 'Grid' | 'List' | 'Table' | 'Album';
  videoPlayerType: 'Minimal' | 'Advanced' | 'Branded' | 'Cinema';
}

interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

interface NavbarConfig {
  logoUrl: string | null;
  logoText: string;
  isLogoVisible: boolean;
  navItems: NavItem[];
}

export interface NavItem {
  href: string;
  label: string;
  access: 'public' | 'authenticated' | 'user' | 'admin';
}

interface FooterItem {
  href: string;
  label: string;
  order: number;
}

// Course content interfaces
interface CourseModule {
  id: string;
  title: string;
  duration: string;
  isAvailable: boolean;
  isCurrentlyPlaying?: boolean;
}

interface CourseContentWidgetProps {
  config: PlatformConfig;
  courseId: string;
}

// Mock data
const mockCourseModules: CourseModule[] = [
  {
    id: '1',
    title: 'Introduction to Digital Marketing',
    duration: '15 min',
    isAvailable: true,
    isCurrentlyPlaying: true,
  },
  {
    id: '2',
    title: 'SEO Fundamentals',
    duration: '20 min',
    isAvailable: false,
  },
  {
    id: '3',
    title: 'Content Marketing Strategies',
    duration: '25 min',
    isAvailable: false,
  },
  {
    id: '4',
    title: 'Social Media Marketing',
    duration: '18 min',
    isAvailable: false,
  },
  {
    id: '5',
    title: 'Email Marketing Campaigns',
    duration: '22 min',
    isAvailable: false,
  },
];

export default function CourseContentWidget({
  config,
  courseId,
}: CourseContentWidgetProps) {
  const handleModuleClick = (moduleId: string) => {
    console.log(`Clicked module: ${moduleId}`);
    // Here you would typically navigate to the module or update the current playing module
  };

  return (
    <div
      className="rounded-lg shadow-md"
      style={{ backgroundColor: config.colors.background }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: `${config.colors.textSecondary}20` }}
      >
        <h3
          className="text-xl font-bold"
          style={{ color: config.colors.textPrimary }}
        >
          Course Content
        </h3>
      </div>

      {/* Module List */}
      <div
        className="divide-y"
        style={{ borderColor: `${config.colors.textSecondary}20` }}
      >
        {mockCourseModules.map((module) => (
          <div
            key={module.id}
            className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
              module.isCurrentlyPlaying
                ? ''
                : module.isAvailable
                  ? 'hover:opacity-80'
                  : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: module.isCurrentlyPlaying
                ? `${config.colors.primary}10`
                : 'transparent',
            }}
            onClick={() => module.isAvailable && handleModuleClick(module.id)}
          >
            {/* Module Icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: module.isCurrentlyPlaying
                  ? `${config.colors.primary}20`
                  : module.isAvailable
                    ? `${config.colors.primary}10`
                    : `${config.colors.textSecondary}10`,
                color:
                  module.isCurrentlyPlaying || module.isAvailable
                    ? config.colors.primary
                    : config.colors.textSecondary,
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
              </svg>
            </div>

            {/* Module Info */}
            <div className="flex-grow">
              <p
                className={`font-semibold ${module.isCurrentlyPlaying ? '' : 'font-medium'}`}
                style={{
                  color: module.isCurrentlyPlaying
                    ? config.colors.primary
                    : config.colors.textPrimary,
                }}
              >
                {module.title}
              </p>
              <p
                className="text-sm"
                style={{
                  color: module.isCurrentlyPlaying
                    ? `${config.colors.primary}80`
                    : config.colors.textSecondary,
                }}
              >
                {module.duration}
              </p>
            </div>

            {/* Status Icon */}
            <div
              style={{
                color: module.isCurrentlyPlaying
                  ? config.colors.primary
                  : config.colors.textSecondary,
              }}
            >
              {module.isCurrentlyPlaying ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-48a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Z"
                    opacity="0.3"
                  ></path>
                  <path d="M128,72a12,12,0,1,0,12,12A12,12,0,0,0,128,72Z"></path>
                  <path d="M112,128a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V136A8,8,0,0,0,112,128Zm40,0a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V136A8,8,0,0,0,152,128Z"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M136,40.34V168a8,8,0,0,1-16,0V40.34a64,64,0,1,0,0,175.32V216a8,8,0,0,1-16,0v-.34a80,80,0,1,1,16,0Z"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
