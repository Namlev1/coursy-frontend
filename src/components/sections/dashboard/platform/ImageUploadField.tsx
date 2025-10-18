import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface ImageUploadFieldProps {
  id: string;
  label: string;
  maxSize: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
}

export default function ImageUploadField({
  id,
  label,
  maxSize,
  register,
  errors,
}: ImageUploadFieldProps) {
  const [fileName, setFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      console.log(`${id} selected:`, {
        name: file.name,
        size: file.size,
        type: file.type,
      });
    } else {
      setFileName('');
      setPreviewUrl('');
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
          ) : (
            <svg
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clipRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                fillRule="evenodd"
              />
            </svg>
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={`${id}-upload`}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
            >
              <span>Upload a file</span>
              <input
                {...register(id, {
                  onChange: handleFileChange,
                })}
                id={`${id}-upload`}
                type="file"
                accept="image/jpeg"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">JPG up to {maxSize}</p>
          {fileName && (
            <p className="mt-2 text-sm text-green-600 font-medium">
              Selected: {fileName}
            </p>
          )}
          {errors?.[id] && (
            <p className="mt-2 text-sm text-red-600">
              {errors[id]?.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
