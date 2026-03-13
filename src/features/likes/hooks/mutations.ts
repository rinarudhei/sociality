import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { likeAPost, unlikeAPost } from '../services/likes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { SetStateAction } from 'react';
import { LikeAPostResponse } from '../types/likes';
import { AxiosError, HttpStatusCode } from 'axios';
import { ApiErrorResponse } from '@/types/api';

export const useLikeAPost = (
  actions: {
    setLikedByMe: React.Dispatch<SetStateAction<boolean>>;
    setLikeCount: React.Dispatch<SetStateAction<number>>;
    setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  },
  id: number
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return useMutation<
    LikeAPostResponse,
    AxiosError,
    { token: string; id: number },
    void
  >({
    mutationFn: likeAPost,
    onMutate: () => {
      actions.setLikeCount((prev) => prev + 1);
      actions.setLikedByMe(true);
      actions.setTriggerFetch(true);
    },
    onError: (e) => {
      actions.setLikedByMe(false);
      actions.setLikeCount((prev) => prev - 1);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/auth');
      } else {
        toast.error('Failed to like a post. Please try again later');
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['likes', id] });
    },
  });
};

export const useUnlikeAPost = (
  actions: {
    setLikedByMe: React.Dispatch<SetStateAction<boolean>>;
    setLikeCount: React.Dispatch<SetStateAction<number>>;
    setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  },
  id: number
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return useMutation<
    LikeAPostResponse,
    AxiosError<ApiErrorResponse>,
    { token: string; id: number },
    void
  >({
    mutationFn: unlikeAPost,
    onMutate: () => {
      actions.setLikeCount((prev) => prev - 1);
      actions.setLikedByMe(false);
    },
    onError: (e) => {
      actions.setLikedByMe(true);
      actions.setLikeCount((prev) => prev + 1);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
        router.push('/auth');
      } else {
        toast.error('Failed to unlike a post. Please try again later');
      }
    },
    onSuccess: () => {
      actions.setTriggerFetch(true);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['likes', id] });
    },
  });
};
