import { apiClient } from './client';
import { Post, Comment } from '../../../shared/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>('/posts');
  return data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const { data } = await apiClient.get<Post>(`/posts/${id}`);
  return data;
};

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const { data } = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
  return data;
};
