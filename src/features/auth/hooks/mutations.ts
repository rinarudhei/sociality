import { useMutation } from '@tanstack/react-query';
import {
  LoginApiParams,
  LoginResponse,
  RegisterApiParams,
  RegisterResponse,
} from '../types/auth';
import { toast } from 'sonner';
import { login, register } from '../services/auth';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../stores/store';
import { setToken } from '@/features/auth/slices/authSlice';
import { setCurrentUser } from '@/features/auth/slices/userSlice';
import { User } from 'lucide-react';

export const useRegister = (toggleIsLoginPage: () => void) => {
  return useMutation({
    mutationFn: (body: RegisterApiParams) => register(body),
    onSuccess: (_: RegisterResponse) => {
      toast.success('Register user success');
      toggleIsLoginPage();
    },
    onError: (e) => {
      toast.error(`Failed register user, please try again`);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: LoginApiParams) => login(body),
    onSuccess: (data: LoginResponse) => {
      dispatch(setToken(data.token));
      dispatch(
        setCurrentUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          username: data.user.username,
          phone: data.user.phone,
          profilePhoto: data.user.profilePhoto,
        })
      );
      router.push('/');
    },
    onError: (e) => {
      toast.error(`Failed login, please insert valid user credentials`);
    },
  });
};
