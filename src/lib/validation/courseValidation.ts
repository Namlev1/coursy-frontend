import { VALIDATION_LIMITS } from '@/lib/validation/constants';
import { createLengthValidator } from '@/lib/validation/validators';

export const validateName = createLengthValidator(
  'Name',
  VALIDATION_LIMITS.COURSE.NAME.MIN_LENGTH,
  VALIDATION_LIMITS.COURSE.NAME.MAX_LENGTH
);

export const validateDescription = createLengthValidator(
  'Description',
  VALIDATION_LIMITS.COURSE.DESCRIPTION.MIN_LENGTH,
  VALIDATION_LIMITS.COURSE.DESCRIPTION.MAX_LENGTH
);

// TODO improve that when adding feature/upload-images
export const validateImageUrl = (value: string): string | undefined => {
  if (!value || value.length === 0) {
    return 'Image URL is required';
  }

  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'URL must use http or https protocol';
    }

    return undefined;
  } catch {
    return 'Invalid URL format';
  }
};
