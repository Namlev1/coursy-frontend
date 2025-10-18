import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface VisualizationCourseListProps {
  formData: PlatformFormData;
}

export default function VisualizationCourseList({
  formData,
}: VisualizationCourseListProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="h-40 w-full rounded-t-lg bg-cover bg-center" />
      <div className="p-4">
        <p className="mb-2 h-5 w-3/4 rounded">Course selection</p>
      </div>
    </div>
  );
}
