import { UserCourse } from '@/types/course';
import CourseRow from '@/components/sections/courseList/CourseRow';
import { fetchCourse } from '@/lib/apiClient';

interface CourseListProps {
  userCourses: UserCourse[];
}

const CourseList: React.FC<CourseListProps> = ({ userCourses }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {userCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No courses found</p>
        </div>
      ) : (
        userCourses.map(async (userCourse) => {
          const course = await fetchCourse(userCourse.courseId);
          return (
            <CourseRow
              key={userCourse.courseId}
              userCourse={userCourse}
              course={course}
            />
          );
        })
      )}
    </div>
  );
};

export default CourseList;
