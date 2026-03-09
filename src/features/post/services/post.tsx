import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { GetPostsParams, GetPostsResponse } from '../types/post';

export const getPosts = async (q: GetPostsParams) => {
  const response = await api.get<ApiResponse<GetPostsResponse>>('/api/posts', {
    params: q,
  });
  return response.data.data;
};
