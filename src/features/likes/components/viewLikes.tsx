'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { SetStateAction } from 'react';
import { useGetLikesByPostId } from '../hooks/queries';
import { useAppSelector } from '@/stores/store';
import { VisuallyHidden } from 'radix-ui';
import ErrorMessage from '@/components/container/errorMessage';
import { Spinner } from '@/components/ui/spinner';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { generateAvatarFallback } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useOnInView } from 'react-intersection-observer';

type ViewLikesProps = {
  children: React.ReactNode;
  id: number;
  triggerFetch: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
};

export const ViewLikes = ({
  children,
  id,
  triggerFetch,
  setTriggerFetch,
}: ViewLikesProps) => {
  const auth = useAppSelector((state) => state.auth);
  const [isOpen, setisOpen] = React.useState(false);
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
  return (
    <Sheet open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side='bottom'>
        <div className='flex h-full w-full flex-col gap-3 overflow-y-scroll rounded-t-2xl bg-neutral-950 px-4 pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <SheetTitle className='text-md -tracking-[0.02rem]'>Likes</SheetTitle>
          <div>
            <SheetDescription>
              <VisuallyHidden.Root>
                List of user who likes this post
              </VisuallyHidden.Root>
            </SheetDescription>

            {isError ? (
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
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
