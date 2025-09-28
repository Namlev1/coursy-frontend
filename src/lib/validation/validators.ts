import { EMAIL_REGEX, VALIDATION_LIMITS } from '@/lib/validation/constants';

export type ValidationResult = string | undefined;

export const createLengthValidator = (
  fieldName: string,
  minLength: number,
  maxLength: number
) => {
  return (value: string): ValidationResult => {
    if (!value || value.length === 0) {
      return `${fieldName} is required`;
    }

    if (value.length < minLength) {
      return `${fieldName} must be at least ${minLength} character${minLength === 1 ? '' : 's'}`;
    }

    if (value.length > maxLength) {
      return `${fieldName} cannot exceed ${maxLength} characters`;
    }

    return undefined;
  };
};

export const createEmailValidator = () => {
  return (value: string): ValidationResult => {
    const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_LIMITS.EMAIL;
    const trimmedValue = value.trim();

    if (!trimmedValue || trimmedValue.length === 0) {
      return 'Email is required';
    }

    if (!trimmedValue.includes('@')) {
      return 'Email must contain @ symbol';
    }

    if (trimmedValue.length < MIN_LENGTH) {
      return `Email must be at least ${MIN_LENGTH} characters long`;
    }

    if (trimmedValue.length > MAX_LENGTH) {
      return `Email must be no more than ${MAX_LENGTH} characters`;
    }

    if (!EMAIL_REGEX.test(trimmedValue)) {
      return 'Please enter a valid email address';
    }

    return undefined;
  };
};
