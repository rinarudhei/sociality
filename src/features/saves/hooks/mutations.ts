import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { savePost, unsavePost } from '../services/save';
import { AxiosError, HttpStatusCode } from 'axios';
import { SavePostService } from '../types/type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import React, { SetStateAction } from 'react';

type UseSavePostProps = {
  setPostSaved: React.Dispatch<SetStateAction<boolean>>;
};
export const useSavePost = ({ setPostSaved }: UseSavePostProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<{ saved: boolean }, AxiosError, SavePostService>({
    mutationFn: savePost,
    onMutate: () => {
      setPostSaved(true);
    },
    onError: (e) => {
      setPostSaved(false);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast('Please login first');
        router.push('/auth');

        return;
      }

      toast('Failed to save post. Pleas try again later');

      return;
    },
    onSuccess() {
      toast.success('Post saved');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-posts', 10] });
    },
  });
};

export const useUnsavePost = ({ setPostSaved }: UseSavePostProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<{ saved: boolean }, AxiosError, SavePostService>({
    mutationFn: unsavePost,
    onMutate: () => {
      setPostSaved(false);
    },
    onError: (e) => {
      setPostSaved(true);
      if (e.status === HttpStatusCode.Unauthorized) {
        toast('Please login first');
        router.push('/auth');

        return;
      }

      toast('Failed to save post. Pleas try again later');

      return;
    },
    onSuccess: () => {
      toast.success('Post Unsaved');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-posts', 10] });
    },
  });
};
