import { useInfiniteQuery } from '@tanstack/react-query';
import { GetPostsParams, GetPostsResponse } from '../types/post';
import { AxiosError } from 'axios';
import { getPosts } from '../services/post';

export const useGetPosts = (params: GetPostsParams) => {
  return useInfiniteQuery<GetPostsResponse, AxiosError>({
    initialPageParam: 1,
    queryKey: ['posts', params],
    queryFn: ({ pageParam }) =>
      getPosts({ ...params, page: pageParam as number }),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      } else {
        return undefined;
      }
    },
  });
};
