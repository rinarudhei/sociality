import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
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
    setTextComment: React.Dispatch<SetStateAction<string>>;
  },
  id: number
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AddPostCommentResponse,
    AxiosError,
    AddPostCommentParams,
    void
  >({
    mutationFn: addPostComment,
    onMutate: () => {
      actions.setCommentCount((prev) => prev + 1);
    },
    onError: (e) => {
      actions.setCommentCount((prev) => prev - 1);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
      } else {
        toast.error('Failed to add a comment. Please try again later');
      }
    },
    onSuccess: () => {
      actions.setTextComment('');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id, 4] });
    },
  });
};

export const useDeleteComment = (
  actions: {
    setCommentCount: React.Dispatch<SetStateAction<number>>;
  },
  id: number
) => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteCommentResponse,
    AxiosError,
    { id: number; token: string },
    void
  >({
    mutationFn: deleteComment,
    onMutate: () => {
      actions.setCommentCount((prev) => prev - 1);
    },
    onError: (e) => {
      actions.setCommentCount((prev) => prev + 1);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast.error('Please login first');
      } else {
        toast.error('Failed to delete a comment. Please try again later');
      }
    },
    onSuccess: () => {},
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });
};
