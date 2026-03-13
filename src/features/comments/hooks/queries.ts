import { AxiosError } from 'axios';
import {
  GetCommentsByPostIdParams,
  GetCommentsByPostIdResponse,
} from '../types/comments';
import { getCommentsByPostId } from '../services/comments';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetCommentsByPostId = (
  params: GetCommentsByPostIdParams,
  isEnabled = true
) => {
  return useInfiniteQuery<GetCommentsByPostIdResponse, AxiosError>({
    initialPageParam: 1,
    enabled: isEnabled,
    queryKey: ['comments', params.id, params.limit],
    queryFn: ({ pageParam }) =>
      getCommentsByPostId({ ...params, page: pageParam as number }),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      }

      return undefined;
    },
  });
};
