import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GetLikesbyPostIdParams } from '../types/likes';
import { getLikesByPostId } from '../services/likes';

export const useGetLikesByPostId = (
  params: GetLikesbyPostIdParams,
  token: string
) => {
  return useQuery({
    queryKey: ['likes-byPostId', params],
    queryFn: () => getLikesByPostId(params, token),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
