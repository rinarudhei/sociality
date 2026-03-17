import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  GetSavedPostsParams,
  GetSavedPostsResponse,
  GetUserByUsernameParams,
  SearchUserParams,
} from '../types/user';
import {
  getLikedPosts,
  getSavedPost,
  getuserByUsername,
  getUserPostsByUsername,
  searchUsers,
} from '../services/queries';
import { AxiosError } from 'axios';

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

export const useGetUserByUsername = (params: GetUserByUsernameParams) => {
  return useQuery({
    queryKey: ['user', params.username],
    queryFn: () => getuserByUsername(params),
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useGetPostsByUsername = (params: GetPostsByUsernameParams) => {
  return useInfiniteQuery<GetPostsByUsernameResponse, AxiosError>({
    initialPageParam: 1,
    queryKey: ['user-posts', params.username],
    queryFn: ({ pageParam }) =>
      getUserPostsByUsername({ ...params, page: pageParam as number }),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      } else {
        return undefined;
      }
    },
  });
};

export const useGetSavedPosts = (params: GetSavedPostsParams) => {
  return useInfiniteQuery<GetSavedPostsResponse, AxiosError>({
    initialPageParam: 1,
    queryKey: ['user-posts', params.limit],
    queryFn: ({ pageParam }) =>
      getSavedPost({ ...params, page: pageParam as number }),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      } else {
        return undefined;
      }
    },
  });
};

export const useGetLikedPosts = (params: GetPostsByUsernameParams) => {
  return useInfiniteQuery<GetPostsByUsernameResponse, AxiosError>({
    initialPageParam: 1,
    queryKey: ['user-posts', params.limit],
    queryFn: ({ pageParam }) =>
      getLikedPosts({ ...params, page: pageParam as number }),
    getNextPageParam: (responseData) => {
      if (responseData.pagination.page < responseData.pagination.totalPages) {
        return responseData.pagination.page + 1;
      } else {
        return undefined;
      }
    },
  });
};
