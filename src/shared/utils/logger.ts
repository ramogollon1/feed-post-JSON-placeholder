import { isApiError } from '../types';

const sanitizeError = (error: unknown): { message: string; context?: string } => {
  if (isApiError(error)) {
    return {
      message: error.message,
      context: `Status: ${error.status}, Code: ${error.code}`,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Unknown error occurred' };
};

export const log = (error: unknown, context: string): void => {
  const sanitized = sanitizeError(error);

  if (__DEV__) {
    console.error(`[${context}]`, sanitized.message, sanitized.context);
  }
};

export const getUserFriendlyErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    if (error.status === 404) return 'Resource not found';
    if (error.status === 500) return 'Server error. Please try again later';
    if (error.status === 503) return 'Service unavailable. Please try again';
  }

  if (error instanceof Error) {
    if (error.message.includes('Network')) return 'Network error. Check your connection';
    if (error.message.includes('timeout')) return 'Request timeout. Please try again';
  }

  return 'Something went wrong. Please try again';
};
