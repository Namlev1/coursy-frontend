'use client';
import { Course, ProgressStatus, UserCourse } from '@/types/course';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

interface CourseRowProps {
  course: Course;
  userCourse: UserCourse;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, userCourse }) => {
  const getStatusColor = () => {
    switch (userCourse.progress) {
      case ProgressStatus.NOT_STARTED:
        return 'text-slate-600 bg-slate-100';
      case ProgressStatus.IN_PROGRESS:
        return 'text-amber-600 bg-amber-100';
      case ProgressStatus.COMPLETED:
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const getButtonConfig = () => {
    switch (userCourse.progress) {
      case ProgressStatus.NOT_STARTED:
        return {
          text: 'Start Course',
          className: 'bg-slate-800 text-white hover:bg-slate-700',
        };
      case ProgressStatus.IN_PROGRESS:
        return {
          text: 'Go to Course',
          className: 'bg-blue-500 text-white hover:bg-blue-600',
        };
      case ProgressStatus.COMPLETED:
        return {
          text: 'Review',
          className: 'bg-emerald-500 text-white hover:bg-emerald-600',
        };
      default:
        return {
          text: 'View',
          className: 'bg-gray-500 text-white hover:bg-gray-600',
        };
    }
  };

  const statusColor = getStatusColor();
  const buttonConfig = getButtonConfig();
  const statusText = userCourse.progress
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 gap-4 transition-shadow hover:shadow-lg">
      <div className="w-full md:w-2/5 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
        {userCourse.finishedDay && (
          <p className="text-xs text-gray-500 mt-1">
            Completed: {new Date(userCourse.finishedDay).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="w-full md:w-2/5 flex items-center">
        <span
          className={`${statusColor} px-3 py-1.5 rounded-full text-sm font-medium`}
        >
          {statusText}
        </span>
      </div>

      <div className="w-full md:w-1/5 flex justify-end">
        <Link
          className={`flex w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${buttonConfig.className}`}
          href={ROUTES.COURSES.path + `/${course.id}`}
        >
          {buttonConfig.text}
        </Link>
      </div>
    </div>
  );
};

export default CourseRow;