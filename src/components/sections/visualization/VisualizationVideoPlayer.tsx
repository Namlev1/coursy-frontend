import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import { useEffect, useRef, useState } from 'react';
import MockedNavbar from '@/components/sections/visualization/mockComponents/MockNavbar';
import MockVideoPlayer from '@/components/sections/visualization/mockComponents/MockVideoPlayer';
import MockCourseContent from '@/components/sections/visualization/mockComponents/MockCourseContent';

interface VisualizationVideoPlayerProps {
  formData: PlatformFormData;
}

export default function VisualizationVideoPlayer({
  formData,
}: VisualizationVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  const fullWidth = 1000;
  const fullHeight = 700;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / fullWidth);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-lg border border-gray-200 bg-white overflow-hidden relative flex flex-col-reverse"
      style={{
        aspectRatio: `${fullWidth} / ${fullHeight}`,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: fullWidth,
          height: fullHeight,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onClick={(e) => e.stopPropagation()}
        onClickCapture={(e) => e.preventDefault()}
      >
        <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
          <MockedNavbar formData={formData} selected={2} />

          <div className="layout-container flex h-full grow flex-col">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
              {/* Page Header */}
              <div>
                <h1
                  className="text-3xl font-bold text-gray-900 mb-2 mt-8"
                  style={{ color: formData.colors.textPrimary }}
                >
                  Introduction to Web Development
                </h1>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <MockVideoPlayer formData={formData} />
                </div>
                <div className="lg:col-span-1">
                  <MockCourseContent formData={formData} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 z-0 bg-white">
        <p className="mb-2 h-5 w-3/4 rounded">Video Player</p>
      </div>
    </div>
  );
}
