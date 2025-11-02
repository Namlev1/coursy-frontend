'use client';

import React, { useEffect, useState } from 'react';
import { Duration } from 'luxon';
import { ThumbnailSize } from '@/types/video';
import { fetchVideo, getVideoThumbnailUrl } from '@/lib/apiClient';
import { ContentDto } from '@/types/content';
import { MaterialType } from '@/types/enums/MaterialType';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuizIcon from '@mui/icons-material/Quiz';
import { PlatformConfig } from '@/types/platformConfig';
import { fetchQuiz } from '@/lib/apiClient/requests/quiz';
import { fetchTextContent } from '@/lib/apiClient/requests/textContent';

interface CourseContentWidgetProps {
  contentList: ContentDto[];
  current: number;
  setCurrent: (index: number) => void;
  isPreview?: boolean;
  config: PlatformConfig;
}

interface ContentWithDetails extends ContentDto {
  details?: any; // Możesz dodać bardziej szczegółowy typ
}

export default function CourseContentWidget({
  contentList,
  current,
  setCurrent,
  isPreview = false,
  config,
}: CourseContentWidgetProps) {
  const [contentWithDetails, setContentWithDetails] = useState<
    ContentWithDetails[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContentDetails() {
      setIsLoading(true);

      const detailsPromises = contentList.map(async (content) => {
        if (content.type === MaterialType.VIDEO) {
          try {
            const video = await fetchVideo(content?.videoId);
            return { ...content, details: video };
          } catch (error) {
            console.error('Failed to load video:', error);
            return content;
          }
        }
        if (content.type === MaterialType.QUIZ) {
          try {
            console.log(content);
            const quiz = await fetchQuiz(content?.quizId);
            return { ...content, details: quiz };
          } catch (error) {
            console.error('Failed to load quiz:', error);
            return content;
          }
        }
        if (content.type === MaterialType.TEXT) {
          try {
            const textContent = await fetchTextContent(content?.textId);
            return { ...content, details: textContent };
          } catch (error) {
            console.error('Failed to load video:', error);
            return content;
          }
        }
        return content;
      });

      const results = await Promise.all(detailsPromises);
      setContentWithDetails(results);
      setIsLoading(false);
    }

    loadContentDetails();
  }, [contentList]);

  const handleContentClick = (index: number) => {
    if (isPreview && index !== current) {
      return;
    }
    console.log(`Clicked content: ${index}`);
    setCurrent(index);
  };

  const renderContentRow = (content: ContentWithDetails, index: number) => {
    const isCurrent = index === current;

    switch (content.type) {
      case MaterialType.VIDEO:
        const video = content.details;
        if (!video) return null;

        return (
          <div
            key={content.id}
            className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
              isCurrent
                ? ''
                : isPreview
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
            }`}
            style={{
              backgroundColor: isCurrent
                ? `${config.colors.primary}10`
                : 'transparent',
            }}
            onClick={() => handleContentClick(index)}
          >
            {/* Video Icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${getVideoThumbnailUrl(video.id, ThumbnailSize.SMALL)})`,
                backgroundColor: `${config.colors.primary}20`,
                color:
                  isCurrent || !isPreview
                    ? config.colors.primary
                    : config.colors.textSecondary,
              }}
            >
              {isCurrent && (
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
                className={`font-semibold ${isCurrent ? '' : 'font-medium'}`}
                style={{
                  color: isCurrent
                    ? config.colors.primary
                    : config.colors.textPrimary,
                }}
              >
                {video.title}
              </p>
              <p
                style={{
                  color: isCurrent
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

      case MaterialType.QUIZ:
        const quiz = content.details;
        return (
          <div
            key={content.id}
            className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
              isCurrent
                ? ''
                : isPreview
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
            }`}
            style={{
              backgroundColor: isCurrent
                ? `${config.colors.primary}10`
                : 'transparent',
            }}
            onClick={() => handleContentClick(index)}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: isCurrent
                  ? `${config.colors.primary}20`
                  : isPreview
                    ? `${config.colors.secondary}20`
                    : `${config.colors.background}`,
              }}
            >
              <QuizIcon
                fontSize="large"
                style={{
                  color: isCurrent
                    ? config.colors.primary
                    : isPreview
                      ? config.colors.textSecondary
                      : config.colors.textPrimary,
                  opacity: isCurrent ? 1 : isPreview ? 0.6 : 0.8,
                }}
              />
            </div>

            <div className="flex-grow">
              <p
                className={`font-semibold ${isCurrent ? '' : 'font-medium'}`}
                style={{
                  color: isCurrent
                    ? config.colors.primary
                    : config.colors.textPrimary,
                }}
              >
                {quiz.quizTitle}
              </p>
              <p
                style={{
                  color: isCurrent
                    ? `${config.colors.primary}80`
                    : config.colors.textSecondary,
                }}
              >
                Quiz
              </p>
            </div>
          </div>
        );

      case MaterialType.TEXT:
        const textContent = content.details;
        return (
          <div
            key={content.id}
            className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
              isCurrent
                ? ''
                : isPreview
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-80'
            }`}
            style={{
              backgroundColor: isCurrent
                ? `${config.colors.primary}10`
                : 'transparent',
            }}
            onClick={() => handleContentClick(index)}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: isCurrent
                  ? `${config.colors.primary}20`
                  : isPreview
                    ? `${config.colors.secondary}20`
                    : `${config.colors.background}`,
              }}
            >
              <TextSnippetIcon
                fontSize="large"
                style={{
                  color: isCurrent
                    ? config.colors.primary
                    : isPreview
                      ? config.colors.textSecondary
                      : config.colors.textPrimary,
                  opacity: isCurrent ? 1 : isPreview ? 0.6 : 0.8,
                }}
              />
            </div>

            <div className="flex-grow">
              <p
                className={`font-semibold ${isCurrent ? '' : 'font-medium'}`}
                style={{
                  color: isCurrent
                    ? config.colors.primary
                    : config.colors.textPrimary,
                }}
              >
                {textContent.title}
              </p>
              <p
                style={{
                  color: isCurrent
                    ? `${config.colors.primary}80`
                    : config.colors.textSecondary,
                }}
              >
                Text content
              </p>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div
        className="rounded-lg shadow-md"
        style={{ backgroundColor: config.colors.background }}
      >
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Content List */}
      <div
        className="divide-y"
        style={{ borderColor: `${config.colors.textSecondary}20` }}
      >
        {contentWithDetails.map((contentItem, index) =>
          renderContentRow(contentItem, index)
        )}
      </div>
    </div>
  );
}
