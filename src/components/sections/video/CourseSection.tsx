'use client';

import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks/redux';
import { Role } from '@/types/enums';
import { ProgressStatus, UserCourse } from '@/types/course';
import { PlatformConfig } from '@/types/platformConfig';
import { updateUserCourse } from '@/lib/apiClient';
import dayjs from 'dayjs';
import { ContentDto } from '@/types/content';
import { ContentViewer } from '@/components/sections/dashboard/courses/ContentViewer';

interface CourseSectionProps {
  contentList: ContentDto[];
  userCourse: UserCourse | null;
  config: PlatformConfig;
}

export default function CourseSection({
  contentList,
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
      const index = contentList.findIndex(
        (video) => video.id === userCourse.currentContent
      );
      if (index !== -1) {
        return index;
      }
    }
    return 0;
  };

  const [current, setCurrent] = useState<number>(findFirst());
  const { isAuthenticated, role, user } = useAppSelector((state) => state.auth);

  const changeCurrentContent = async (index: number) => {
    let progress;
    if (index === contentList.length - 1) {
      progress = ProgressStatus.COMPLETED;
    } else {
      progress = ProgressStatus.IN_PROGRESS;
    }
    const dto: UserCourse = {
      ...userCourse,
      currentContent: contentList[index].id,
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
        <ContentViewer
          content={contentList[current]}
          isAuthenticated={isAuthenticated}
          isPreview={isPreview()}
          config={config}
          user={user}
        />
      </div>
      <div className="lg:col-span-1">
        <CourseContentWidget
          contentList={contentList}
          current={current}
          setCurrent={changeCurrentContent}
          isPreview={isPreview()}
          config={config}
        />
      </div>
    </>
  );
}
