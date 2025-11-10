import axios, { AxiosError } from 'axios';
import { log } from '../../../shared/utils';
import { ApiError } from '../../../shared/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = new ApiError(
      error.message,
      error.response?.status,
      error.code
    );

    log(apiError, 'API_ERROR');
    return Promise.reject(apiError);
  }
);
