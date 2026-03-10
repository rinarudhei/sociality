import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { likeAPost, unlikeAPost } from '../services/likes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { SetStateAction } from 'react';

export const useLikeAPost = (
  token: string,
  actions: {
    setLikedByMe: React.Dispatch<SetStateAction<boolean>>;
    setLikeCount: React.Dispatch<SetStateAction<number>>;
  }
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  if (token === '') {
    router.push('/auth');
  }

  return useMutation({
    mutationFn: likeAPost,
    onMutate: () => {
      actions.setLikeCount((prev) => prev + 1);
      actions.setLikedByMe(true);
    },
    onError: () => {
      toast.error('Failed to like a post. Please try again later');
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['likes-byPostId'] });
    },
  });
};

export const useUnlikeAPost = (
  token: string,
  actions: {
    setLikedByMe: React.Dispatch<SetStateAction<boolean>>;
    setLikeCount: React.Dispatch<SetStateAction<number>>;
  }
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  if (token === '') {
    router.push('/auth');
  }

  return useMutation({
    mutationFn: unlikeAPost,
    onMutate: () => {
      actions.setLikeCount((prev) => prev - 1);
      actions.setLikedByMe(false);
    },
    onError: () => {
      toast.error('Failed to like a post. Please try again later');
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['likes-byPostId'] });
    },
  });
};
