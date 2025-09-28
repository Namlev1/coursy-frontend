'use client';

import CourseContentWidget from '@/components/sections/dashboard/courses/CourseContentWidget';
import { PlatformConfig } from '@/types/platformConfig';
import { Video } from '@/types/video';
import { useState } from 'react';
import CoursePlayer from '@/components/sections/dashboard/courses/CoursePlayer';

interface CourseSectionProps {
  config: PlatformConfig;
  videos: Video[];
}

export default function CourseSection({ config, videos }: CourseSectionProps) {
  const [current, setCurrent] = useState<number>(0);
  return (
    <>
      <div className="lg:col-span-2">
        <CoursePlayer config={config} videos={videos} current={current} />
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
