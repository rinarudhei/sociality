import { QueryClient, useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '../services/commands';
import {
  FollowUserParams,
  FollowUserResponse,
  UseFollowUserProps,
} from '../types/follow';
import { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useFollowUser = ({
  id,
  setTriggerRefetch,
}: UseFollowUserProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<FollowUserResponse, AxiosError, FollowUserParams, void>({
    mutationFn: followUser,
    onMutate: (params) => {
      toast.success(`You are following ${params.username}`);
    },
    onSuccess: () => {
      setTriggerRefetch(true);
    },
    onError: (e) => {
      setTriggerRefetch(false);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', id, 6] });
    },
  });
};

export const useUnfollowUser = ({
  id,
  setTriggerRefetch,
}: UseFollowUserProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<FollowUserResponse, AxiosError, FollowUserParams, void>({
    mutationFn: unfollowUser,
    onMutate: (params) => {
      toast.success(`You just unfollowed ${params.username}`);
    },
    onSuccess: () => {
      setTriggerRefetch(true);
    },
    onError: (e) => {
      setTriggerRefetch(false);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', id, 6] });
    },
  });
};
