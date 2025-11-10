'use client';

import { PlatformConfig } from '@/types/platformConfig';
import { User } from '@/types/user';
import { ContentDto } from '@/types/content';
import { MaterialType } from '@/types/enums/MaterialType';
import VideoPlayer from '@/components/sections/dashboard/courses/VideoPlayer';
import { addCourseToUser, fetchVideo } from '@/lib/apiClient';
import { fetchQuiz } from '@/lib/apiClient/requests/quiz';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import React, { useEffect, useState } from 'react';
import { ProgressStatus, UserCourse } from '@/types/course';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'node:crypto';
import { fetchTextContent } from '@/lib/apiClient/requests/textContent';
import QuizPlayer from '@/components/sections/dashboard/courses/QuizPlayer';
import TextPlayer from '@/components/sections/dashboard/courses/TextPlayer';

interface ContentViewerProps {
  content: ContentDto;
  isPreview: boolean;
  isAuthenticated: boolean;
  config: PlatformConfig;
  user: User;
}

export function ContentViewer({
  content,
  isPreview,
  isAuthenticated,
  config,
  user,
}: ContentViewerProps) {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as UUID;

  const [contentData, setContentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      setError(null);

      try {
        switch (content.type) {
          case MaterialType.VIDEO:
            const video = await fetchVideo(content?.videoId);
            setContentData({ type: 'video', data: video });
            break;
          case MaterialType.QUIZ:
            const quiz = await fetchQuiz(content?.quizId);
            setContentData({ type: 'quiz', data: quiz });
            break;
          case MaterialType.TEXT:
            const textContent = await fetchTextContent(content?.textId);
            setContentData({ type: 'text', data: textContent });
            break;
        }
      } catch (err) {
        setError('Failed to load content');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [content.type, content.videoId, content.quizId, content.textId]);

  const handleCourseAdded = async () => {
    const userId = user.id;
    const dto: UserCourse = {
      userId,
      courseId,
      progress: ProgressStatus.NOT_STARTED,
      currentContent: content.id,
      id: null,
      finishedDay: null,
    };
    await addCourseToUser(dto);
    router.refresh();
  };

  const renderViewer = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center p-8 text-red-500">
          {error}
        </div>
      );
    }

    if (!contentData) return null;

    switch (contentData.type) {
      case 'video':
        return <VideoPlayer video={contentData.data} config={config} />;
      case 'quiz':
        return <QuizPlayer quizContent={contentData.data} config={config} />;
      case 'text':
        return <TextPlayer textContent={contentData.data} config={config} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {renderViewer()}
      {!isAuthenticated ? (
        <div className={'mt-2 p-4'}>
          <Link
            href={ROUTES.LOGIN.path}
            className="inline-flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: config.colors.primary }}
          >
            Login to access course
          </Link>
        </div>
      ) : (
        isPreview && (
          <div className={'mt-2 p-4'}>
            <button
              className="flex min-w-[84px] items-center justify-center rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
              style={{ backgroundColor: config.colors.primary }}
              onClick={handleCourseAdded}
            >
              Add course to your learning
            </button>
          </div>
        )
      )}
    </div>
  );
}
