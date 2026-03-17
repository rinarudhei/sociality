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
import { useParams } from 'next/navigation';
import React from 'react';

export const ProfileInfo = () => {
  const { username } = useParams<{ username: string }>();
  const auth = useAppSelector((state) => state.auth);
  const {
    data: userData,
    isPending: isUserDataPending,
    isError: isUserDataError,
  } = useGetUserByUsername({ username, token: auth.token });
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
              className='object-contain'
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
          <Button
            variant='outline'
            className='text-neutral-25 mx-0 h-10 max-w-77.25 shrink px-0 text-sm font-bold -tracking-[0.01rem] sm:max-w-32.5'
          >
            Edit Profile
          </Button>
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
