import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import {
  generateAvatarFallback,
  generateUploadTimeDiffString,
} from '@/lib/utils';
import React, { SetStateAction } from 'react';
import { useOnInView } from 'react-intersection-observer';
import { useGetCommentsByPostId } from '../hooks/queries';
import { Separator } from '@/components/ui/separator';
import ErrorMessage from '@/components/container/errorMessage';

type CommentListProps = {
  id: number;
  isOpen: boolean;
  triggerFetch: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
};
export const CommentList = ({
  isOpen,
  triggerFetch,
  setTriggerFetch,
  id,
}: CommentListProps) => {
  const {
    data,
    isPending,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetCommentsByPostId({ id, page: 1, limit: 4 }, isOpen);

  const trackingRef = useOnInView(
    (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: '200px', threshold: 1.0, triggerOnce: false }
  );

  React.useEffect(() => {
    if (isOpen && triggerFetch) {
      setTriggerFetch(false);
      refetch();
    }
  }, [isOpen, triggerFetch, refetch]);

  return isError ? (
    <ErrorMessage errorMessage='Failed loading user data' />
  ) : isPending || isFetching ? (
    <Spinner />
  ) : (
    <>
      {data.pages.length === 0 || data.pages[0].comments.length === 0 ? (
        <div className='flex-center mx-auto h-full max-h-38.75 w-full max-w-90.25 flex-col gap-1'>
          <p className='text-neutral-25 text-md text-center font-bold -tracking-[0.02rem]'>
            No Comments yet
          </p>
          <p className='text-center text-sm font-normal -tracking-[0.02rem] text-neutral-400'>
            Start the conversation
          </p>
        </div>
      ) : (
        <ul className='flex h-full w-full flex-col gap-5'>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.comments.map((comment) => (
                <li key={comment.id} className='flex w-full flex-col gap-3'>
                  <div className='flex w-full flex-col gap-2.5'>
                    <div className='flex-center w-full gap-2'>
                      <Avatar className='size-10'>
                        <AvatarImage
                          src={comment.author.avatarUrl}
                          alt='User Profile Picture'
                          className='object-contain'
                        />

                        <AvatarFallback>
                          {generateAvatarFallback(comment.author.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex h-10.5 w-full flex-col items-center gap-0'>
                        <h4 className='text-neutral-25 w-full text-xs font-semibold tracking-normal sm:text-sm sm:font-bold sm:-tracking-[0.01rem]'>
                          {comment.author.name}
                        </h4>
                        <p className='h-4 w-full text-xs font-normal -tracking-[0.03rem] text-neutral-400 sm:tracking-normal'>
                          {generateUploadTimeDiffString(comment.createdAt)}
                        </p>
                      </div>
                    </div>

                    <p className='text-neutral-25 text-xs font-normal -tracking-[0.03rem] sm:text-sm sm:-tracking-[0.02rem]'>
                      {comment.text}
                    </p>
                  </div>
                  <Separator className='bg-neutral-900' />
                </li>
              ))}
            </React.Fragment>
          ))}

          <div ref={trackingRef} className='flex-center flex-col'>
            {(isFetching || isFetchingNextPage) && <Spinner />}
          </div>
        </ul>
      )}
    </>
  );
};
