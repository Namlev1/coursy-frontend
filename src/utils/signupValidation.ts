const validateName = (value: string, fieldName: string): string | undefined => {
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

export const validateFirstName = (value: string): string | undefined => {
  return validateName(value, 'First name');
};

export const validateLastName = (value: string): string | undefined => {
  return validateName(value, 'Last name');
};

export const validateEmail = (value: string): string | undefined => {
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

export const validatePassword = (value: string): string | undefined => {
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
