'use client';
import { Course, ProgressStatus, UserCourse } from '@/types/course';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

interface CourseRowProps {
  course: Course;
  userCourse: UserCourse;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, userCourse }) => {
  // todo fix
  const getProgressPercentage = () => {
    switch (userCourse.progress) {
      case ProgressStatus.NOT_STARTED:
        return 0;
      case ProgressStatus.IN_PROGRESS:
        return 75;
      case ProgressStatus.COMPLETED:
        return 100;
      default:
        return 0;
    }
  };

  const getStatusColor = () => {
    switch (userCourse.progress) {
      case ProgressStatus.NOT_STARTED:
        return 'text-slate-600';
      case ProgressStatus.IN_PROGRESS:
        return 'text-amber-500';
      case ProgressStatus.COMPLETED:
        return 'text-emerald-500';
      default:
        return 'text-slate-600';
    }
  };

  const getProgressBarColor = () => {
    switch (userCourse.progress) {
      case ProgressStatus.NOT_STARTED:
        return 'bg-slate-400';
      case ProgressStatus.IN_PROGRESS:
        return 'bg-amber-500';
      case ProgressStatus.COMPLETED:
        return 'bg-emerald-500';
      default:
        return 'bg-slate-400';
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
        // todo
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

  const progressPercentage = getProgressPercentage();
  const statusColor = getStatusColor();
  const progressBarColor = getProgressBarColor();
  const buttonConfig = getButtonConfig();
  const statusText = userCourse.progress
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 gap-4 transition-shadow hover:shadow-lg">
      <div className="w-full md:w-2/5 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Status:{' '}
          <span className={`${statusColor} font-medium`}>{statusText}</span>
        </p>
        {userCourse.finishedDay && (
          <p className="text-xs text-gray-400 mt-1">
            Completed: {new Date(userCourse.finishedDay).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="w-full md:w-2/5 flex items-center gap-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${progressBarColor} h-2.5 rounded-full transition-all duration-300`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-900 min-w-[40px]">
          {progressPercentage}%
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
