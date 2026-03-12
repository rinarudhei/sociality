import auth from '@/app/auth/partials/auth';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { generateAvatarFallback } from '@/lib/utils';
import clsx from 'clsx';
import React, { SetStateAction } from 'react';
import { useOnInView } from 'react-intersection-observer';
import { useGetLikesByPostId } from '../hooks/queries';
import { useAppSelector } from '@/stores/store';
import ErrorMessage from '@/components/container/errorMessage';

type LikesList = {
  id: number;
  isOpen: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  triggerFetch: boolean;
};
export const LikesList = ({
  isOpen,
  id,
  setTriggerFetch,
  triggerFetch,
}: LikesList) => {
  const auth = useAppSelector((state) => state.auth);
  const {
    data,
    isPending,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetLikesByPostId({ id, page: 1, limit: 6 }, auth.token, isOpen);

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
    <ul className='flex h-full w-full flex-col gap-5 rounded-2xl'>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.users.map((user) => (
            <li
              key={user.id}
              className='flex w-full items-center justify-between'
            >
              {/* user info */}
              <div className='flex-center w-full gap-2'>
                <Avatar className='size-12'>
                  <AvatarImage
                    src={user.avatarUrl}
                    alt='User Profile Picture'
                    className='object-contain'
                  />

                  <AvatarFallback>
                    {generateAvatarFallback(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className='flex w-full flex-col gap-0'>
                  <h4 className='text-neutral-25 w-full text-sm font-bold -tracking-[0.01rem]'>
                    {user.name}
                  </h4>
                  <p className='w-full text-sm font-normal -tracking-[0.02rem] text-neutral-400'>
                    {user.username}
                  </p>
                </div>
              </div>

              {/* follow button */}
              <Button
                variant={user.isFollowedByMe ? 'outline' : 'default'}
                className={clsx(
                  'h-10 gap-2 border-neutral-900 px-4 py-2',
                  user.isFollowedByMe ? 'max-w-31.75' : 'max-w-23.25'
                )}
              >
                <div className='text-neutral-25 text-sm font-bold -tracking-[0.01rem]'>
                  {user.isFollowedByMe ? 'Following' : 'Follow'}
                </div>
              </Button>
            </li>
          ))}
        </React.Fragment>
      ))}

      <div ref={trackingRef} className='flex-center flex-col'>
        {(isFetching || isFetchingNextPage) && <Spinner />}
      </div>
    </ul>
  );
};
