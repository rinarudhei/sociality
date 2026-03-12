import { QueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';
import { toast } from 'sonner';
import { addPostComment, deleteComment } from '../services/comments';
import {
  AddPostCommentParams,
  AddPostCommentResponse,
  DeleteCommentResponse,
} from '../types/comments';
import { AxiosError, HttpStatusCode } from 'axios';

export const useAddComment = (
  actions: {
    setCommentCount: React.Dispatch<SetStateAction<number>>;
    setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  },
  id: number
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return useMutation<
    AddPostCommentResponse,
    AxiosError,
    AddPostCommentParams,
    void
  >({
    mutationFn: addPostComment,
    onMutate: () => {
      actions.setCommentCount((prev) => prev + 1);
      actions.setTriggerFetch(true);
    },
    onError: (e) => {
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
      } else {
        toast.error('Failed to add a comment. Please try again later');
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });
};

export const useDeleteComment = (
  actions: {
    setCommentCount: React.Dispatch<SetStateAction<number>>;
    setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  },
  id: number
) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return useMutation<
    DeleteCommentResponse,
    AxiosError,
    { id: number; token: string },
    void
  >({
    mutationFn: deleteComment,
    onMutate: () => {
      actions.setCommentCount((prev) => prev - 1);
      actions.setTriggerFetch(true);
    },
    onError: (e) => {
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
      } else {
        toast.error('Failed to delete a comment. Please try again later');
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });
};
