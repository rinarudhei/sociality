import ErrorMessage from '@/components/container/errorMessage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../../../components/ui/dialog';
import { useSearchUser } from '../hooks/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { SetStateAction } from 'react';
import { VisuallyHidden } from 'radix-ui';
import { Spinner } from '@/components/ui/spinner';
import { generateAvatarFallback } from '@/lib/utils';
import useMedia from 'use-media';

type SearchResultDialog = {
  query: string;
  children: React.ReactNode;
  showSearchResult: boolean;
  setShowSearchResult: React.Dispatch<SetStateAction<boolean>>;
};

export const SearchResultDialog = ({
  children,
  query,
  setShowSearchResult,
  showSearchResult,
}: SearchResultDialog) => {
  const isSmallish = useMedia({ maxWidth: '640px' });
  const { data, isPending, isFetching, isError } = useSearchUser(
    {
      q: query,
      page: 1,
      limit: 6,
    },
    showSearchResult
  );

  React.useEffect(() => {
    if (isSmallish) {
      setShowSearchResult(false);
    }
  }, [isSmallish]);

  return isError ? (
    <ErrorMessage errorMessage='Search users failed' />
  ) : (
    <Dialog open={showSearchResult} onOpenChange={setShowSearchResult}>
      {/* Test Search Input component*/}
      {children}
      <DialogContent
        className='flex-center absolute top-18.5 w-full max-w-122.75 gap-4 rounded-3xl border-neutral-900 bg-black p-5'
        showCloseButton={false}
        transparentOverlay={true}
      >
        <DialogTitle className='absolute'>
          <VisuallyHidden.Root />
        </DialogTitle>
        <DialogDescription>
          <VisuallyHidden.Root>Search user results</VisuallyHidden.Root>
        </DialogDescription>
        {isPending || isFetching ? (
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
                className='flex gap-2'
                key={user.id}
                onClick={() => setShowSearchResult(false)}
              >
                <Avatar size='default' className='sm:size-12'>
                  <AvatarImage
                    src={user.avatarUrl}
                    alt='User Profile Picture'
                    className='object-contain'
                  />

                  <AvatarFallback>
                    {generateAvatarFallback(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h4 className='text-neutral-25 w-98.75 text-sm font-bold -tracking-[0.01rem]'>
                    {user.name}
                  </h4>
                  <p className='-trakcing-[0.02rem] w-98.75 text-sm font-normal text-neutral-400'>
                    {user.username}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
