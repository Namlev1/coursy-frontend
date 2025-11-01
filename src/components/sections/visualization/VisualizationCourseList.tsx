import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import { useEffect, useRef, useState } from 'react';
import MockedNavbar from '@/components/sections/visualization/mockComponents/MockNavbar';
import MockCourseGrid from '@/components/sections/visualization/mockComponents/MockCourseGrid';

interface VisualizationCourseListProps {
  formData: PlatformFormData;
}

export default function VisualizationCourseList({
  formData,
}: VisualizationCourseListProps) {
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
        aspectRatio: `${fullWidth} / ${fullHeight}`, // Maintain aspect ratio
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
        <MockedNavbar formData={formData} selected={2} />
        <MockCourseGrid formData={formData} />
      </div>
      <div className="p-4 border-t border-gray-200 z-0 bg-white">
        <p className="mb-2 h-5 w-3/4 rounded">Course list</p>
      </div>
    </div>
  );
}
