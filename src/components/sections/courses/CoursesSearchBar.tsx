import React from 'react';

interface CoursesSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function CoursesSearchBar({
  placeholder = 'Search courses...',
  onSearch,
}: CoursesSearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <label className={`relative flex-1`}>
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            fillRule="evenodd"
          />
        </svg>
      </span>
      <input
        className="form-input block w-full rounded-full border-slate-300 bg-white py-3 pl-12 pr-4 text-base placeholder:text-slate-400 focus:border-indigo-600 focus:ring-indigo-600"
        placeholder={placeholder}
        type="search"
        onChange={handleInputChange}
      />
    </label>
  );
}
