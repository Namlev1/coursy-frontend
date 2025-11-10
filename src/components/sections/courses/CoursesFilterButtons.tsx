import { PlatformConfig } from '@/types/platformConfig';

interface CoursesFilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  config: PlatformConfig;
}

export default function CoursesFilterButtons({
  activeFilter,
  onFilterChange,
  config,
}: CoursesFilterButtonsProps) {
  const filters = ['All Courses', 'In Progress', 'Completed'];

  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeFilter === filter
              ? 'text-white'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
          style={
            activeFilter === filter
              ? { backgroundColor: config.colors.primary }
              : undefined
          }
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
