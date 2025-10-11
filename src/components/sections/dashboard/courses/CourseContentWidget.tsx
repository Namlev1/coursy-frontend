'use client';

import React from 'react';
import { Duration } from 'luxon';
import { ThumbnailSize, Video } from '@/types/video';
import { getVideoThumbnailUrl } from '@/lib/apiClient';
import { useConfig } from '@/components/ConfigProvider';

interface CourseContentWidgetProps {
  videos: Video[];
  current: number;
  setCurrent: (index: number) => void;
  isPreview?: boolean;
}

export default function CourseContentWidget({
  videos,
  current,
  setCurrent,
  isPreview = false,
}: CourseContentWidgetProps) {
  const config = useConfig();
  const handleVideoClick = (index: number) => {
    if (isPreview && index !== current) {
      return;
    }
    console.log(`Clicked video: ${index}`);
    setCurrent(index);
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

      {/* Video List */}
      <div
        className="divide-y"
        style={{ borderColor: `${config.colors.textSecondary}20` }}
      >
        {videos.map((video, index) => {
          console.log(current);
          const isCurrentlyPlaying = index === current;
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
                  ? `${config.colors.primary}10`
                  : 'transparent',
              }}
              onClick={() => handleVideoClick(index)}
            >
              {/* Video Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getVideoThumbnailUrl(video.id, ThumbnailSize.SMALL)})`,
                  backgroundColor: `${config.colors.primary}20`, // fallback color
                  color:
                    isCurrentlyPlaying || !isPreview
                      ? config.colors.primary
                      : config.colors.textSecondary,
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
                      ? config.colors.primary
                      : config.colors.textPrimary,
                  }}
                >
                  {video.title}
                </p>
                <p
                  style={{
                    color: isCurrentlyPlaying
                      ? `${config.colors.primary}80`
                      : config.colors.textSecondary,
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
