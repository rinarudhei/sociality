import { useParams } from 'next/navigation';
import { useGetPostsByUsername } from '../hooks/queries';
import ErrorMessage from '@/components/container/errorMessage';
import { Spinner } from '@/components/ui/spinner';
import { useOnInView } from 'react-intersection-observer';
import React from 'react';
import { PostBox } from '@/app/profile/[username]/partials/postBox';
import { PostsEmptyMessage } from '@/components/container/postsEmptyMessage';
import { useAppSelector } from '@/stores/store';

export const TabContentGallery = () => {
  const { username } = useParams<{ username: string }>();
  const user = useAppSelector((state) => state.user);
  const {
    data,
    isError,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useGetPostsByUsername({ username, page: 1, limit: 10 });

  const trackingRef = useOnInView(
    (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: '200px', threshold: 1.0, triggerOnce: false }
  );

  return isError ? (
    <ErrorMessage errorMessage='Failed loading posts' />
  ) : (isPending || isFetching) && !isFetchingNextPage ? (
    <Spinner />
  ) : (
    <div className='hide-scroll h-full sm:h-203'>
      {data &&
      data.pages[0]?.posts.length == 0 &&
      user.username === username ? (
        <PostsEmptyMessage />
      ) : (
        <>
          <div className='hide-scroll grid w-90.25 grid-cols-3 gap-0.5 sm:w-full sm:gap-0.75 md:w-full lg:w-203 lg:gap-1'>
            {data &&
              data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.posts.map((post, i) => (
                    <PostBox key={i} post={post} />
                  ))}
                </React.Fragment>
              ))}
            <div className='h-15 w-full sm:h-20 md:h-21' />
          </div>

          <div ref={trackingRef} className='flex-center flex-col'>
            {(isFetching || isFetchingNextPage) && <Spinner />}
          </div>
        </>
      )}
    </div>
  );
};
