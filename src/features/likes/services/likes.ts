import { api } from '@/lib/api';
import {
  GetLikesbyPostIdParams,
  GetLikesByPostIdResponse,
  LikeAPostResponse,
  UnlikeAPostResponse,
} from '../types/likes';
import { ApiResponse } from '@/types/api';

export async function getLikesByPostId(
  params: GetLikesbyPostIdParams,
  token: string
) {
  const response = await api.get<ApiResponse<GetLikesByPostIdResponse>>(
    `/api/posts/${params.id}/likes`,
    {
      params: { page: params.page, limit: params.limit },
      headers: { Authorization: 'Bearer ' + token },
    }
  );

  return response.data.data;
}

export async function likeAPost({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<LikeAPostResponse> {
  const response = await api.post<ApiResponse<LikeAPostResponse>>(
    `/api/posts/${id}/like`,
    undefined,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response.data.data;
}

export async function unlikeAPost({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<UnlikeAPostResponse> {
  const response = await api.delete<ApiResponse<LikeAPostResponse>>(
    `/api/posts/${id}/like`,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response.data.data;
}
