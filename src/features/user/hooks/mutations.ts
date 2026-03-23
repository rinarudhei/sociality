import { QueryClient, useMutation } from '@tanstack/react-query';
import { followUser, patchProfile, unfollowUser } from '../services/commands';
import {
  FollowUserParams,
  FollowUserResponse,
  UseFollowUserProps,
} from '../types/follow';
import { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { id } from 'zod/v4/locales';
import { PatchProfileResponse, UserProfileDetail } from '../types/user';
import { ShowSuccessToast } from '@/features/post/components/successToast';
import { useAppDispatch } from '@/stores/store';
import {
  clearCurrentUser,
  setCurrentUser,
} from '@/features/auth/slices/userSlice';

export const useFollowUser = (props: UseFollowUserProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<FollowUserResponse, AxiosError, FollowUserParams, void>({
    mutationFn: followUser,
    onMutate: (params) => {},
    onSuccess: (_, variables) => {
      if (props.id) {
        props.setTriggerRefetch(true);
      }

      toast.success(`You are following ${variables.username}`);
    },
    onError: (e) => {
      if (props.id) {
        props.setTriggerRefetch(false);
      }

      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/auth');
      }
    },
    onSettled: (data, err, variables) => {
      if (props.id) {
        queryClient.invalidateQueries({ queryKey: ['likes', props.id, 6] });
        queryClient.invalidateQueries({
          queryKey: ['user', variables.username],
        });
      }
    },
  });
};

export const useUnfollowUser = (props: UseFollowUserProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<FollowUserResponse, AxiosError, FollowUserParams, void>({
    mutationFn: unfollowUser,
    onMutate: (params) => {},
    onSuccess: (_, variables) => {
      if (props.id) {
        props.setTriggerRefetch(true);
      }

      toast.success(`You just unfollowed ${variables.username}`);
    },
    onError: (e) => {
      if (props.id) {
        props.setTriggerRefetch(false);
      }
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/auth');
      }
    },
    onSettled: () => {
      if (props.id) {
        queryClient.invalidateQueries({ queryKey: ['likes', id, 6] });
      }
    },
  });
};

export const usePatchProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<
    PatchProfileResponse,
    AxiosError,
    { formData: FormData; token: string }
  >({
    mutationFn: patchProfile,
    onError: (e) => {
      if (e.status === HttpStatusCode.Unauthorized) {
        router.push('/auth');
        toast.error('Please login first');
        return;
      }

      toast.error('Failed to update profile. Please try again later');
    },
    onSuccess: (data, variables) => {
      ShowSuccessToast('Profile Success Update');
      dispatch(clearCurrentUser());
      dispatch(
        setCurrentUser({
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          profilePhoto: data.avatarUrl,
        })
      );
    },

    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', data?.username] });
      router.push('/profile/' + data?.username + '/?useRefetch=true');
    },
  });
};
