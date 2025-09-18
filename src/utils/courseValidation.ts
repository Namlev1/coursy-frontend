export const validateName = (value: string): string | undefined => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 50;

  if (!value || value.length === 0) {
    return 'Name is required';
  }
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Invalid name length`;
  }

  return undefined;
};

export const validateDescription = (value: string): string | undefined => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 50;

  if (!value || value.length === 0) {
    return 'Description is required';
  }
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Invalid description length`;
  }

  return undefined;
};

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
  } catch (error) {
    return 'Invalid URL format';
  }
};