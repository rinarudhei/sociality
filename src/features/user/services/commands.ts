import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { FollowUserParams, FollowUserResponse } from '../types/follow';

export async function followUser(params: FollowUserParams) {
  const response = await api.post<ApiResponse<FollowUserResponse>>(
    `/api/follow/${params.username}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${params.token}` },
    }
  );

  return response.data.data;
}

export async function unfollowUser(params: FollowUserParams) {
  const response = await api.delete<ApiResponse<FollowUserResponse>>(
    `/api/follow/${params.username}`,
    {
      headers: { Authorization: `Bearer ${params.token}` },
    }
  );

  return response.data.data;
}
