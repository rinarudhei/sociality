import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import {
  GetPostsParams,
  GetPostsResponse,
  UploadPostParams,
  UploadPostResponse,
} from '../types/post';

export const getPosts = async (q: GetPostsParams, token: string) => {
  const response = await api.get<ApiResponse<GetPostsResponse>>('/api/posts', {
    params: q,
    headers: { Authorization: token.length > 0 ? 'Bearer ' + token : '' },
  });
  return response.data.data;
};

export const uploadPost = async ({ formData, token }: UploadPostParams) => {
  const response = await api.post<ApiResponse<UploadPostResponse>>(
    '/api/posts',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};
