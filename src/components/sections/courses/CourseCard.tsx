interface CourseCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onViewCourse?: () => void;
  className?: string;
}

export default function CourseCard({
  name,
  description,
  imageUrl,
  onViewCourse,
  className = '',
}: CourseCardProps) {
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
        <button
          className="mt-4 w-full rounded-full bg-blue-100 py-2 px-4 text-sm font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Course
        </button>
      </div>
    </div>
  );
}
