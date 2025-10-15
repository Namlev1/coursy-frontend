'use client';

import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { Video } from '@/types/video';
import { useState } from 'react';
import CoursePlayer from '@/components/sections/dashboard/courses/CoursePlayer';
import { useAppSelector } from '@/store/hooks/redux';
import { Role } from '@/types/enums';
import { UserCourse } from '@/types/course';
import { PlatformConfig } from '@/types/platformConfig';

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
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="lg:col-span-2">
        <CoursePlayer
          videos={videos}
          current={current}
          isAuthenticated={isAuthenticated}
          isPreview={isPreview()}
          config={config}
        />
      </div>
      <div className="lg:col-span-1">
        <CourseContentWidget
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          isPreview={isPreview()}
        />
      </div>
    </>
  );
}
