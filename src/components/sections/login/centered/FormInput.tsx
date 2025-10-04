'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  error?: string;
  touched: boolean;
  register: UseFormRegisterReturn;
  primaryColor: string;
  autoComplete?: string;
}

export default function FormInput({
  label,
  id,
  type,
  placeholder,
  error,
  touched,
  register,
  primaryColor,
  autoComplete,
}: FormInputProps) {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register}
          autoComplete={autoComplete}
          className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors border ${
            touched && error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300'
          }`}
          style={{
            borderColor: touched && error ? undefined : '#e2e8f0',
            ...(!(touched && error) &&
              ({
                '--tw-ring-color': primaryColor,
              } as React.CSSProperties)),
          }}
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
        />
        {touched && error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
