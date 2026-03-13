import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  GetLikesbyPostIdParams,
  GetLikesByPostIdResponse,
} from '../types/likes';
import { getLikesByPostId } from '../services/likes';
import { AxiosError } from 'axios';

export const useGetLikesByPostId = (
  params: GetLikesbyPostIdParams,
  token: string,
  isEnabled = true
) => {
  return useInfiniteQuery<GetLikesByPostIdResponse, AxiosError>({
    initialPageParam: 1,
    enabled: isEnabled,
    placeholderData: keepPreviousData,
    queryKey: ['likes', params.id, params.page, params.limit],
    queryFn: ({ pageParam }) =>
      getLikesByPostId({ ...params, page: pageParam as number }, token),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      }

      return undefined;
    },
  });
};
