import { getUserFriendlyErrorMessage } from '../../../src/shared/utils/logger';
import { ApiError } from '../../../src/shared/types';

describe('logger utils', () => {
  describe('getUserFriendlyErrorMessage', () => {
    it('returns custom message for 404 errors', () => {
      const error = new ApiError('Not found', 404);
      expect(getUserFriendlyErrorMessage(error)).toBe('Resource not found');
    });

    it('returns custom message for 500 errors', () => {
      const error = new ApiError('Internal error', 500);
      expect(getUserFriendlyErrorMessage(error)).toBe('Server error. Please try again later');
    });

    it('returns custom message for 503 errors', () => {
      const error = new ApiError('Service unavailable', 503);
      expect(getUserFriendlyErrorMessage(error)).toBe('Service unavailable. Please try again');
    });

    it('returns network error message for network errors', () => {
      const error = new Error('Network request failed');
      expect(getUserFriendlyErrorMessage(error)).toBe('Network error. Check your connection');
    });

    it('returns timeout message for timeout errors', () => {
      const error = new Error('Request timeout after 10s');
      expect(getUserFriendlyErrorMessage(error)).toBe('Request timeout. Please try again');
    });

    it('returns generic message for unknown errors', () => {
      const error = new Error('Unknown error');
      expect(getUserFriendlyErrorMessage(error)).toBe('Something went wrong. Please try again');
    });

    it('handles non-Error objects', () => {
      expect(getUserFriendlyErrorMessage('string error')).toBe('Something went wrong. Please try again');
      expect(getUserFriendlyErrorMessage(null)).toBe('Something went wrong. Please try again');
      expect(getUserFriendlyErrorMessage(undefined)).toBe('Something went wrong. Please try again');
    });
  });
});
