import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { fetchPosts, fetchPostById, fetchCommentsByPostId } from '../api';
import { Post, Comment } from '../../../shared/types';

const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
} as const;

export const usePosts = (): UseQueryResult<Post[], Error> => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    ...QUERY_CONFIG,
  });
};

export const usePost = (id: number): UseQueryResult<Post, Error> => {
  return useQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    ...QUERY_CONFIG,
  });
};

export const useComments = (postId: number): UseQueryResult<Comment[], Error> => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    ...QUERY_CONFIG,
  });
};

export const usePrefetchPost = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['post', id],
      queryFn: () => fetchPostById(id),
      ...QUERY_CONFIG,
    });

    queryClient.prefetchQuery({
      queryKey: ['comments', id],
      queryFn: () => fetchCommentsByPostId(id),
      ...QUERY_CONFIG,
    });
  };
};
