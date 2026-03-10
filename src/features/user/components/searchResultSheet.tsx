'use client';

import ErrorMessage from '@/components/container/errorMessage';
import React, { SetStateAction } from 'react';
import { useSearchUser } from '../hooks/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { generateAvatarFallback } from '@/lib/utils';
import useMedia from 'use-media';

type SearchResultSheet = {
  query: string;
  showSearchResult: boolean;
  setShowSearchResult: React.Dispatch<SetStateAction<boolean>>;
};

export const SearchResultSheet = ({
  query,
  showSearchResult,
  setShowSearchResult,
}: SearchResultSheet) => {
  const isLargish = useMedia({ minWidth: '640px' });
  const { data, isPending, isFetching, isError } = useSearchUser(
    {
      q: query,
      page: 1,
      limit: 6,
    },
    showSearchResult
  );

  React.useEffect(() => {
    if (isLargish) {
      setShowSearchResult(false);
    }
  }, [isLargish]);

  return (
    <div className='absolute top-16.25 flex h-screen w-screen flex-col bg-black py-4'>
      {isError ? (
        <ErrorMessage errorMessage='Search users failed' />
      ) : (
        <div className='flex flex-col items-center gap-4'>
          {isPending ? (
            <div></div>
          ) : isFetching ? (
            <Spinner />
          ) : data.users.length === 0 ? (
            <div
              className='flex-center flex h-38.75 w-110 flex-col gap-1'
              onClick={() => setShowSearchResult(false)}
            >
              <h3 className='text-md text-neutral-25 text-center font-bold -tracking-[0.02rem]'>
                No Results Found
              </h3>
              <p className='font-regular text-center text-sm -tracking-[0.02rem] text-neutral-400'>
                Change your keyword
              </p>
            </div>
          ) : (
            <>
              {data.users.map((user) => (
                <div
                  className='flex w-full gap-2'
                  key={user.id}
                  onClick={() => setShowSearchResult(false)}
                >
                  <Avatar size='default' className='size-12'>
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
                    <p className='-trakcing-[0.02rem] w-full text-sm font-normal text-neutral-400'>
                      {user.username}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
