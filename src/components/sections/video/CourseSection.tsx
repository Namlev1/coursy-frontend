'use client';

import PreviewCoursePlayer from '@/components/sections/dashboard/courses/PreviewCoursePlayer';
import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { PlatformConfig } from '@/types/platformConfig';
import { Video } from '@/types/video';
import { useState } from 'react';

interface CourseSectionProps {
  config: PlatformConfig;
  videos: Video[];
}

export default function CourseSection({ config, videos }: CourseSectionProps) {
  const [current, setCurrent] = useState<number>(0);
  return (
    <>
      <div className="lg:col-span-2">
        <PreviewCoursePlayer config={config} />
      </div>
      <div className="lg:col-span-1">
        <CourseContentWidget
          config={config}
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          isPreview={false}
        />
      </div>
    </>
  );
}
