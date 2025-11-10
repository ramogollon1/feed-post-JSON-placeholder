export interface Post {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

export interface Comment {
  readonly postId: number;
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
