import { AxiosError } from 'axios';

interface ErrorResponse {
  status: number;
  message: string;
}

function extractErrorResponse(error: AxiosError): ErrorResponse {
  const status = error.response?.status || 0;
  const responseData = error.response?.data;

  let message = DEFAULT_ERROR_MESSAGE;

  // Handle different types of response data
  if (typeof responseData === 'string') {
    message = responseData;
  } else if (responseData && typeof responseData === 'object') {
    // Try to extract message from common fields
    message =
      (responseData as any).message ||
      (responseData as any).error ||
      (responseData as any).msg ||
      JSON.stringify(responseData); // Fallback: stringify the object
  }

  return { status, message };
}

function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    const { status, message } = extractErrorResponse(error);

    switch (status) {
      case 500:
        throw new Error('Server error occurred');
      default:
        throw new Error(message);
    }
  } else if (error.request) {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  } else {
    throw new Error('Request configuration error');
  }
}

export const DEFAULT_ERROR_MESSAGE =
  'Network error - please check your connection';

export function handleError(error: unknown): never {
  if (error instanceof AxiosError) {
    handleAxiosError(error);
  }
  throw new Error('An unexpected error occurred');
}
