import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { GetPostsParams, GetPostsResponse } from '../types/post';

export const getPosts = async (q: GetPostsParams, token: string) => {
  const response = await api.get<ApiResponse<GetPostsResponse>>('/api/posts', {
    params: q,
    headers: { Authorization: token.length > 0 ? 'Bearer ' + token : '' },
  });
  return response.data.data;
};
