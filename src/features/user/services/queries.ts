import { api } from '@/lib/api';
import {
  GetPostsByUsernameParams,
  GetPostsByUsernameResponse,
  GetSavedPostsParams,
  GetSavedPostsResponse,
  GetUserByUsernameParams,
  GetUserByUsernameResponse,
  SearchUserParams,
  SearchUserResponse,
} from '../types/user';
import { ApiResponse } from '@/types/api';

export async function searchUsers(params: SearchUserParams) {
  const response = await api.get<ApiResponse<SearchUserResponse>>(
    '/api/users/search',
    { params }
  );

  return response.data.data;
}

export async function getuserByUsername(params: GetUserByUsernameParams) {
  const response = await api.get<ApiResponse<GetUserByUsernameResponse>>(
    '/api/users/' + params.username,
    { headers: { Authorization: `Bearer ${params.token}` } }
  );

  return response.data.data;
}

export async function getUserPostsByUsername({
  username,
  page,
  limit,
}: GetPostsByUsernameParams): Promise<GetPostsByUsernameResponse> {
  const response = await api.get<ApiResponse<GetPostsByUsernameResponse>>(
    `/api/users/${username}/posts`,
    { params: { page, limit } }
  );

  return response.data.data;
}

export async function getSavedPost({
  page,
  limit,
  token,
}: GetSavedPostsParams): Promise<GetSavedPostsResponse> {
  const response = await api.get<ApiResponse<GetSavedPostsResponse>>(
    `/api/me/saved`,
    { params: { page, limit }, headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data.data;
}
