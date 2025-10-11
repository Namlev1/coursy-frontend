'use client';

import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { Video } from '@/types/video';
import { useState } from 'react';
import CoursePlayer from '@/components/sections/dashboard/courses/CoursePlayer';
import { useAppSelector } from '@/store/hooks/redux';

interface CourseSectionProps {
  videos: Video[];
}

export default function CourseSection({ videos }: CourseSectionProps) {
  const [current, setCurrent] = useState<number>(0);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="lg:col-span-2">
        <CoursePlayer videos={videos} current={current} />
      </div>
      <div className="lg:col-span-1">
        <CourseContentWidget
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          isPreview={!isAuthenticated}
        />
      </div>
    </>
  );
}
