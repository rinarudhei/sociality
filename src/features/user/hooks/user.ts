import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SearchUserParams } from '../types/user';
import { searchUsers } from '../services/user';

export const useSearchUser = (
  params: SearchUserParams,
  showSearchResult: boolean
) => {
  return useQuery({
    queryKey: ['search-user', params],
    queryFn: () => searchUsers(params),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: params.q !== undefined && params.q !== '' && showSearchResult,
  });
};
