'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignupFormCenteredSectionProps {
  logoUrl: string;
  logoText: string;
  title: string;
  subtitle: string;
  submitText: string;
  loginLinkText: string;
  loginLinkHref: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupFormCenteredSection({
  logoUrl,
  logoText,
  title,
  subtitle,
  submitText,
  loginLinkText,
  loginLinkHref,
}: SignupFormCenteredSectionProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions matching Kotlin backend rules

  // Name validation (for firstName and lastName)
  const validateName = (
    value: string,
    fieldName: string
  ): string | undefined => {
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 50;

    if (!value || value.length === 0) {
      return `${fieldName} is required`;
    }
    if (value.length < MIN_LENGTH) {
      return `${fieldName} must be at least ${MIN_LENGTH} characters long`;
    }
    if (value.length > MAX_LENGTH) {
      return `${fieldName} must be no more than ${MAX_LENGTH} characters`;
    }
    return undefined;
  };

  const validateFirstName = (value: string): string | undefined => {
    return validateName(value, 'First name');
  };

  const validateLastName = (value: string): string | undefined => {
    return validateName(value, 'Last name');
  };

  // Email validation matching Kotlin rules
  const validateEmail = (value: string): string | undefined => {
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const MIN_LENGTH = 6;
    const MAX_LENGTH = 60;

    if (!value || value.length === 0) {
      return 'Email is required';
    }
    if (!value.includes('@')) {
      return 'Email must contain @ symbol';
    }
    if (value.length < MIN_LENGTH) {
      return `Email must be at least ${MIN_LENGTH} characters long`;
    }
    if (value.length > MAX_LENGTH) {
      return `Email must be no more than ${MAX_LENGTH} characters`;
    }
    if (!EMAIL_REGEX.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  // Password validation matching Kotlin rules
  const validatePassword = (value: string): string | undefined => {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 72;
    const UPPERCASE_REGEX = /[A-Z]/;
    const LOWERCASE_REGEX = /[a-z]/;
    const DIGIT_REGEX = /[0-9]/;
    const SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;
    const REPEATING_CHARS_REGEX = /(.)\1{2,}/; // Three or more consecutive same characters

    if (!value || value.length === 0) {
      return 'Password is required';
    }
    if (value.length < MIN_LENGTH) {
      return `Password must be at least ${MIN_LENGTH} characters long`;
    }
    if (value.length > MAX_LENGTH) {
      return `Password must be no more than ${MAX_LENGTH} characters`;
    }

    // Check complexity requirements
    const complexityErrors: string[] = [];
    if (!UPPERCASE_REGEX.test(value)) {
      complexityErrors.push('uppercase letter');
    }
    if (!LOWERCASE_REGEX.test(value)) {
      complexityErrors.push('lowercase letter');
    }
    if (!DIGIT_REGEX.test(value)) {
      complexityErrors.push('number');
    }
    if (!SPECIAL_CHAR_REGEX.test(value)) {
      complexityErrors.push('special character');
    }

    if (complexityErrors.length > 0) {
      const lastError = complexityErrors.pop();
      const errorMessage =
        complexityErrors.length > 0
          ? `Password must contain at least one ${complexityErrors.join(', ')} and ${lastError}`
          : `Password must contain at least one ${lastError}`;
      return errorMessage;
    }

    // Check for repeating characters
    if (REPEATING_CHARS_REGEX.test(value)) {
      return 'Password cannot contain three or more consecutive identical characters';
    }

    return undefined;
  };

  const validateConfirmPassword = (
    value: string,
    password: string
  ): string | undefined => {
    if (!value) {
      return 'Please confirm your password';
    }
    if (value !== password) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const firstNameError = validateFirstName(formData.firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateLastName(formData.lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    return newErrors;
  };

  // Handle input changes
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Validate field if it has been touched
      if (touched.has(field)) {
        let error: string | undefined;

        switch (field) {
          case 'firstName':
            error = validateFirstName(value);
            break;
          case 'lastName':
            error = validateLastName(value);
            break;
          case 'email':
            error = validateEmail(value);
            break;
          case 'password':
            error = validatePassword(value);
            // Also revalidate confirm password if it has been touched
            if (touched.has('confirmPassword')) {
              const confirmError = validateConfirmPassword(
                formData.confirmPassword,
                value
              );
              setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
            }
            break;
          case 'confirmPassword':
            error = validateConfirmPassword(value, formData.password);
            break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };

  // Handle field blur
  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => new Set(prev).add(field));

    let error: string | undefined;
    switch (field) {
      case 'firstName':
        error = validateFirstName(formData.firstName);
        break;
      case 'lastName':
        error = validateLastName(formData.lastName);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(
          formData.confirmPassword,
          formData.password
        );
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(
      new Set(['firstName', 'lastName', 'email', 'password', 'confirmPassword'])
    );

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from the server
        if (response.status === 409) {
          setErrors({ email: 'This email is already registered' });
        } else if (response.status === 400) {
          // Parse validation errors from server
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ general: data.message || 'Invalid input data' });
          }
        } else {
          setErrors({
            general: data.message || 'Registration failed. Please try again.',
          });
        }
        return;
      }

      // Success! Redirect to login or dashboard
      console.log('Registration successful!', data);

      // You might want to show a success message first
      // or auto-login the user
      router.push(loginLinkHref);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general:
          'Unable to connect to the server. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = Object.keys(validateForm()).length === 0;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link
            className="inline-flex items-center gap-3 text-2xl font-bold text-gray-900"
            href="/"
          >
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={40}
                height={40}
                priority
                className="rounded"
              />
            )}
            <span>{logoText}</span>
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {errors.general && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    autoComplete="given-name"
                    className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                      touched.has('firstName') && errors.firstName
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                    }`}
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  {touched.has('firstName') && errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    autoComplete="family-name"
                    className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                      touched.has('lastName') && errors.lastName
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                    }`}
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  {touched.has('lastName') && errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  autoComplete="email"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touched.has('email') && errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="email"
                  name="email"
                  placeholder="john.doe@acme.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.has('email') && errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  autoComplete="new-password"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touched.has('password') && errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  onBlur={handleBlur('password')}
                />
                {touched.has('password') && errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  autoComplete="new-password"
                  className={`block w-full rounded-lg shadow-sm sm:text-sm h-12 px-4 transition-colors ${
                    touched.has('confirmPassword') && errors.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]'
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                {touched.has('confirmPassword') && errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-lg bg-[var(--primary-600)] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[var(--primary-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-600)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                type="submit"
                style={{
                  backgroundColor:
                    isSubmitting || !isFormValid
                      ? '#9CA3AF'
                      : 'var(--color-primary)',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : submitText}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {`${loginLinkText} `}
            <Link
              className="font-semibold leading-6 text-[var(--color-primary)] hover:text-[var(--primary-500)]"
              href={loginLinkHref}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
