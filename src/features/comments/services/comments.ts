import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import {
  AddPostCommentResponse,
  DeleteCommentResponse,
  GetCommentsByPostIdParams,
  GetCommentsByPostIdResponse,
} from '../types/comments';

export async function getCommentsByPostId(params: GetCommentsByPostIdParams) {
  const response = await api.get<ApiResponse<GetCommentsByPostIdResponse>>(
    `/api/posts/${params.id}/comments`,
    {
      params: { page: params.page, limit: params.limit },
    }
  );

  return response.data.data;
}

export async function addPostComment({
  id,
  text,
  token,
}: {
  id: number;
  text: string;
  token: string;
}): Promise<AddPostCommentResponse> {
  const response = await api.post<ApiResponse<AddPostCommentResponse>>(
    `/api/posts/${id}/comments`,
    { text },
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response.data.data;
}

export async function deleteComment({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<DeleteCommentResponse> {
  const response = await api.delete<ApiResponse<DeleteCommentResponse>>(
    `/api/comments/${id}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response.data.data;
}
