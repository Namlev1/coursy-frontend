'use client';

import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { Video } from '@/types/video';
import { useState } from 'react';
import CoursePlayer from '@/components/sections/dashboard/courses/CoursePlayer';
import { useAppSelector } from '@/store/hooks/redux';
import { Role } from '@/types/enums';
import { ProgressStatus, UserCourse } from '@/types/course';
import { PlatformConfig } from '@/types/platformConfig';
import { updateUserCourse } from '@/lib/apiClient';
import dayjs from 'dayjs';

interface CourseSectionProps {
  videos: Video[];
  userCourse: UserCourse | null;
  config: PlatformConfig;
}

export default function CourseSection({
  videos,
  userCourse,
  config,
}: CourseSectionProps) {
  const isPreview = () => {
    return (
      !isAuthenticated || (role === Role.ROLE_PLATFORM_USER && !userCourse)
    );
  };

  const findFirst = () => {
    if (userCourse) {
      const index = videos.findIndex(
        (video) => video.id === userCourse.currentVideo
      );
      if (index !== -1) {
        return index;
      }
    }
    return 0;
  };

  const [current, setCurrent] = useState<number>(findFirst());
  const { isAuthenticated, role, user } = useAppSelector((state) => state.auth);

  const changeVideo = async (index: number) => {
    let progress;
    if (index === videos.length - 1) {
      progress = ProgressStatus.COMPLETED;
    } else {
      progress = ProgressStatus.IN_PROGRESS;
    }
    const dto: UserCourse = {
      ...userCourse,
      currentVideo: videos[index].id,
      progress,
      finishedDay:
        progress === ProgressStatus.COMPLETED
          ? dayjs().format('YYYY-MM-DD')
          : null,
    };
    await updateUserCourse(userCourse?.id, dto);
    setCurrent(index);
  };

  return (
    <>
      <div className="lg:col-span-2">
        <CoursePlayer
          videos={videos}
          current={current}
          isAuthenticated={isAuthenticated}
          isPreview={isPreview()}
          config={config}
          user={user}
        />
      </div>
      <div className="lg:col-span-1">
        <CourseContentWidget
          videos={videos}
          current={current}
          setCurrent={changeVideo}
          isPreview={isPreview()}
        />
      </div>
    </>
  );
}
