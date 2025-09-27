import { getCachedConfig } from '@/lib/configCache';
import VideoManagement from '@/components/sections/dashboard/courses/VideoManagement';
import { Video } from '@/types/video';
import { API_BASE_URL } from '@/api/client';

async function fetchMetadata(videoId: string): Promise<Video> {
  const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return await response.json();
}

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
  const metadata = await fetchMetadata(videoId);

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col px-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full">
          <VideoManagement config={config} metadata={metadata} />
        </div>
      </div>
    </div>
  );
}
