import {
  PASSWORD_REGEXES,
  VALIDATION_LIMITS,
} from '@/lib/validation/constants';
import {
  createEmailValidator,
  createLengthValidator,
  ValidationResult,
} from '@/lib/validation/validators';

export const validateFirstName = createLengthValidator(
  'First name',
  VALIDATION_LIMITS.FIRST_NAME.MIN_LENGTH,
  VALIDATION_LIMITS.FIRST_NAME.MAX_LENGTH
);

export const validateLastName = createLengthValidator(
  'Last name',
  VALIDATION_LIMITS.LAST_NAME.MIN_LENGTH,
  VALIDATION_LIMITS.LAST_NAME.MAX_LENGTH
);

export const validateEmail = createEmailValidator();

export const validatePassword = (value: string): ValidationResult => {
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_LIMITS.PASSWORD;

  if (!value || value.length === 0) {
    return 'Password is required';
  }

  if (value.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters`;
  }

  if (value.length > MAX_LENGTH) {
    return `Password cannot exceed ${MAX_LENGTH} characters`;
  }

  const complexityErrors: string[] = [];

  if (!PASSWORD_REGEXES.UPPERCASE.test(value)) {
    complexityErrors.push('uppercase letter');
  }

  if (!PASSWORD_REGEXES.LOWERCASE.test(value)) {
    complexityErrors.push('lowercase letter');
  }

  if (!PASSWORD_REGEXES.DIGIT.test(value)) {
    complexityErrors.push('digit');
  }

  if (!PASSWORD_REGEXES.SPECIAL_CHAR.test(value)) {
    complexityErrors.push('special character');
  }

  if (complexityErrors.length > 0) {
    const missing = complexityErrors
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1');
    return `Password must contain at least one ${missing}`;
  }

  if (PASSWORD_REGEXES.REPEATING_CHARS.test(value)) {
    return 'Password cannot contain three or more consecutive identical characters';
  }

  return undefined;
};

export const validateConfirmPassword = (
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
