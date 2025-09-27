import { getCachedConfig } from '@/lib/configCache';
import VideoManagement from '@/components/sections/dashboard/courses/VideoManagement';

interface ManageVideoPageProps {
  params: {
    courseId: string;
    videoId: string;
  };
}

export default async function ManageVideoPage({
  params: { videoId },
}: ManageVideoPageProps) {
  const config = await getCachedConfig();

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <VideoManagement config={config} videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
