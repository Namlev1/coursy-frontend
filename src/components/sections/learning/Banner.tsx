import { getCachedConfig } from '@/lib/configCache';
import { ProgressStatus, UserCourse } from '@/types/course';

interface BannerProps {
  userCourses: UserCourse[];
}

export default async function Banner({ userCourses }: BannerProps) {
  const config = await getCachedConfig();
  const { colors } = config;

  const completedCourses = userCourses.reduce((count, course) => {
    if (course.progress === ProgressStatus.COMPLETED) count++;
    return count;
  }, 0);
  const totalCourses = userCourses.length;
  const progressPercentage = (completedCourses / totalCourses) * 100;

  return (
    <div
      className="mb-10 flex flex-col gap-6 overflow-hidden rounded-xl p-6 md:flex-row md:items-center"
      style={{
        background: `linear-gradient(to bottom right, ${colors.primary}33, ${colors.primary}0D)`,
      }}
    >
      <div className="flex-1">
        <p
          className="mb-1 text-sm font-medium"
          style={{ color: colors.primary }}
        >
          Overall Progress
        </p>
        <h2
          className="mb-2 text-2xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          Completed {completedCourses} of {totalCourses} courses
        </h2>
        <p
          className="max-w-prose text-sm"
          style={{ color: colors.textSecondary }}
        >
          Keep up the great work! You're making excellent progress towards your
          learning goals.
        </p>
        <div
          className="mt-4 h-2 w-full rounded-full"
          style={{ backgroundColor: `${colors.textSecondary}40` }}
        >
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: colors.primary,
            }}
          />
        </div>
      </div>
      <div
        className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat md:w-1/3 md:max-w-xs"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop")',
        }}
      />
    </div>
  );
}
