import React from 'react';
import { PlatformFormData } from '@/components/sections/dashboard/platform/CreatePlatformWidget';

interface MockCoursesSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  formData: PlatformFormData;
}

export default function MockCoursesSearchBar({
  placeholder = 'Search courses...',
  onSearch,
  formData,
}: MockCoursesSearchBarProps) {
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
        className="form-input block w-full rounded-full py-3 pl-12 pr-4 text-base"
        style={{
          borderColor: formData.colors.primary,
          '--tw-ring-color': formData.colors.primary,
        }}
        placeholder={placeholder}
        type="search"
        onChange={handleInputChange}
      />
    </label>
  );
}
