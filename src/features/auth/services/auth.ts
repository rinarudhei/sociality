import { ApiResponse } from '../../../types/api';
import {
  LoginApiParams,
  LoginResponse,
  RegisterApiParams,
  RegisterResponse,
} from '../types/auth';
import { api } from '../../../lib/api';

export const login = async (data: LoginApiParams) => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    '/api/auth/login',
    data
  );
  return response.data.data;
};

export const register = async (data: RegisterApiParams) => {
  const response = await api.post<ApiResponse<RegisterResponse>>(
    '/api/auth/register',
    data
  );

  return response.data.data;
};
