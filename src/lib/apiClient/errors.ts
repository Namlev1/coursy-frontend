import { AxiosError } from 'axios';

interface ErrorResponse {
  status: number;
  message: string;
}

function extractErrorResponse(error: AxiosError): ErrorResponse {
  const status = error.response?.status || 0;
  const message = error.response?.data as string;
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
    throw new Error('Network error - please check your connection');
  } else {
    throw new Error('Request configuration error');
  }
}

export function handleError(error: unknown): never {
  if (error instanceof AxiosError) {
    handleAxiosError(error);
  }
  throw new Error('An unexpected error occurred');
}
