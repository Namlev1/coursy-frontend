import VideoManagement from '@/components/sections/dashboard/courses/VideoManagement';
import { fetchVideo } from '@/lib/apiClient';
import { UUID } from 'node:crypto';

interface ManageVideoPageProps {
  params: {
    courseId: string;
    videoId: UUID;
  };
}

export default async function ManageVideoPage({
  params: { videoId },
}: ManageVideoPageProps) {
  const metadata = await fetchVideo(videoId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <VideoManagement metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
