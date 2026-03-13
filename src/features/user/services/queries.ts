import { api } from '@/lib/api';
import { SearchUserParams, SearchUserResponse } from '../types/user';
import { ApiResponse } from '@/types/api';

export async function searchUsers(params: SearchUserParams) {
  const response = await api.get<ApiResponse<SearchUserResponse>>(
    '/api/users/search',
    { params }
  );

  return response.data.data;
}
