import { QueryClient, useMutation } from '@tanstack/react-query';
import { uploadPost } from '../services/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { ShowSuccessToast } from '../components/successToast';

export const useUploadPost = (username: string) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: uploadPost,
    onError: () => {
      toast.error('Failed to upload photo. Please try again later.');
    },
    onSettled(data, error, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: ['posts', 5] });
      queryClient.invalidateQueries({ queryKey: ['user-posts', username] });

      router.push('/');
    },
    onSuccess(data, variables, onMutateResult, context) {
      ShowSuccessToast('Success Post');
      // toast('Success Post', {
      //   position: 'top-right',
      //   style: {
      //     background: '#079455',
      //     color: 'white',
      //     border: 'none',
      //     fontSize: '14px',
      //     lineHeight: '28px',
      //     letterSpacing: '-0.02rem',
      //     fontWeight: 600,
      //   },
      //   action: {
      //     label: 'X',
      //     actionButtonStyle: {
      //       fill: '#079455',
      //       stroke: '#079455',
      //       background: 'transparent',
      //       border: 'none',
      //       color: 'white',
      //     },
      //     onClick: () => close(),
      //   },
      // });
    },
  });
};
