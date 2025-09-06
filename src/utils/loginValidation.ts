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
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Invalid email length`;
  }
  if (!EMAIL_REGEX.test(value)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (value: string): string | undefined => {
  const MIN_LENGTH = 1;
  const MAX_LENGTH = 72;

  if (!value || value.length === 0) {
    return 'Password is required';
  }
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Invalid password length`;
  }

  return undefined;
};
