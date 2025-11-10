import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlatformConfig } from '@/types/platformConfig';

interface CourseCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onViewCourse?: () => void;
  className?: string;
  courseId: string;
  config: PlatformConfig;
}

export default function CourseCard({
  name,
  description,
  imageUrl,
  onViewCourse,
  className = '',
  courseId,
  config,
}: CourseCardProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (onViewCourse) {
      onViewCourse();
    }
  };

  return (
    <div
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1 ${className}`}
      onClick={handleClick}
    >
      <div className="h-40 w-full overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-slate-800">{name}</h3>
        <p className="mt-1 flex-grow text-sm text-slate-600">{description}</p>
        <Link
          className="mt-4 w-full rounded-full py-2 px-4 text-sm font-semibold text-white transition-colors text-center hover:opacity-90"
          href={pathname + '/' + courseId}
          style={{ backgroundColor: config.colors.primary }}
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
