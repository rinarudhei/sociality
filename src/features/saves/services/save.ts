import { api } from '@/lib/api';
import { SavePostService } from '../types/type';
import { ApiResponse } from '@/types/api';

export async function savePost({ id, token }: SavePostService) {
  const response = await api.post<ApiResponse<{ saved: boolean }>>(
    `/api/posts/${id}/save`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
}

export async function unsavePost({ id, token }: SavePostService) {
  const response = await api.delete<ApiResponse<{ saved: boolean }>>(
    `/api/posts/${id}/save`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
}
