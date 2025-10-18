import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';
import MockedNavbar from '@/components/sections/visualization/mockComponents/MockNavbar';
import { useEffect, useRef, useState } from 'react';
import MockHeroSection from '@/components/sections/visualization/mockComponents/MockHero';

interface VisualizationHomePageProps {
  formData: PlatformFormData;
}

export default function VisualizationHomePage({
  formData,
}: VisualizationHomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  const fullWidth = 1000;
  const fullHeight = 700;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        console.log('Container width:', containerWidth);
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
      >
        <MockedNavbar formData={formData} />
        <MockHeroSection formData={formData} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <p className="mb-2 h-5 w-3/4 rounded">Home page</p>
      </div>
    </div>
  );
}
