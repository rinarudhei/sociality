'use clinet';
import ErrorMessage from '@/components/container/errorMessage';
import { MetricBox } from '@/components/container/metricBox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { userMetrics } from '@/constants/user-metrics';
import { useGetUserByUsername } from '@/features/user/hooks/queries';
import { generateAvatarFallback } from '@/lib/utils';
import { useAppSelector } from '@/stores/store';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { CiCircleCheck } from 'react-icons/ci';
import {
  useFollowUser,
  useUnfollowUser,
} from '@/features/user/hooks/mutations';
import Link from 'next/link';

export const ProfileInfo = () => {
  const { username } = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const useRefetch = searchParams.get('useRefetch');
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const {
    data: userData,
    isPending: isUserDataPending,
    isError: isUserDataError,
    refetch,
  } = useGetUserByUsername({ username, token: auth.token });
  const [triggerFetch, setTriggerRefetch] = React.useState(false);

  const { mutate } = useFollowUser({
    id: userData ? userData.id : null,
    setTriggerRefetch,
  });
  const { mutate: mutateUnfollow } = useUnfollowUser({
    id: userData ? userData.id : null,
    setTriggerRefetch,
  });

  const handleFollowUser = (username: string) => {
    mutate({ token: auth.token, username });
  };

  const handleUnfollowUser = (username: string) => {
    mutateUnfollow({ token: auth.token, username });
  };

  React.useEffect(() => {
    if (triggerFetch) {
      refetch();
      setTriggerRefetch(false);
    }
  }, [triggerFetch, refetch]);
  React.useEffect(() => {
    if (useRefetch) {
      refetch();
    }
  }, [useRefetch]);
  return isUserDataError ? (
    <ErrorMessage errorMessage='Error loading user data' />
  ) : isUserDataPending ? (
    <Spinner />
  ) : (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex w-full flex-col gap-3 sm:flex-row'>
        {/* user avatar */}
        <div className='flex-center w-full gap-3'>
          <Avatar className='size-16'>
            <AvatarImage
              src={userData.avatarUrl}
              alt='User Profile Picture'
              className=''
            />

            <AvatarFallback className='text-2xl'>
              {generateAvatarFallback(userData.name)}
            </AvatarFallback>
          </Avatar>

          <div className='flex w-full flex-col gap-0'>
            <h4 className='text-neutral-25 w-full text-sm font-bold -tracking-[0.01rem]'>
              {userData.name}
            </h4>
            <p className='w-full text-sm font-normal -tracking-[0.02rem] text-neutral-400'>
              {userData.username}
            </p>
          </div>
        </div>

        {/* Profile Buttons */}
        <div className='flex w-full items-center justify-around gap-3 sm:max-w-47.5'>
          {/* follow button  && edit profile button*/}
          {userData.username !== user.username ? (
            <Button
              variant={userData.isFollowing ? 'outline' : 'default'}
              className={clsx(
                'h-10 gap-2 border-neutral-900',
                userData.isFollowing
                  ? 'max-w-31.75 px-4 py-2'
                  : 'max-w-23.25 px-6 py-2'
              )}
              onClick={
                userData.isFollowing
                  ? () => handleUnfollowUser(username)
                  : () => handleFollowUser(username)
              }
            >
              {userData.isFollowing ? (
                <div className='text-neutral-25 flex-between w-full text-sm font-bold -tracking-[0.01rem] text-nowrap'>
                  <CiCircleCheck size={20} className='text-neutral-25 size-5' />
                  <p>Following</p>
                </div>
              ) : (
                <p className='text-neutral-25 text-sm font-bold -tracking-[0.01rem]'>
                  Follow
                </p>
              )}
            </Button>
          ) : (
            <Button
              asChild
              variant='outline'
              className='text-neutral-25 mx-0 h-10 max-w-77.25 shrink cursor-pointer px-0 text-sm font-bold -tracking-[0.01rem] sm:max-w-32.5'
            >
              <Link href={`/profile/edit/${user.username}`}>Edit Profile</Link>
            </Button>
          )}
          <div className='flex-center h-10 w-10 gap-1.75 rounded-full border border-neutral-900 p-1.75'>
            <Image
              src='/svg/Share Icon.svg'
              alt='share icon svg'
              width={20}
              height={20}
              className='w-full object-contain'
            />
          </div>
        </div>
      </div>

      {/* Profile Description */}
      <p className='text-neutral-25 min-h-14 text-sm font-normal -tracking-[0.02rem]'>
        {userData.bio}
      </p>

      {/* metrics */}
      <div className='flex-around h-12.5'>
        {userMetrics.map((m, i, arr) => (
          <React.Fragment key={m.metric}>
            <MetricBox metric={m.metric} counts={userData.counts} />
            {i < arr.length - 1 && (
              <Separator className='bg-neutral-900' orientation='vertical' />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
