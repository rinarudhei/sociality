import { PostBox } from '@/app/profile/[username]/partials/postBox';
import ErrorMessage from '@/components/container/errorMessage';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import React from 'react';
import { useOnInView } from 'react-intersection-observer';
import { useGetSavedPosts } from '../hooks/queries';
import { useAppSelector } from '@/stores/store';

export const TabContentSaved = () => {
  const auth = useAppSelector((state) => state.auth);
  const {
    data,
    isError,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useGetSavedPosts({ token: auth.token, page: 1, limit: 10 });

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
  ) : isPending || isFetching ? (
    <Spinner />
  ) : (
    <>
      <div className='grid grid-cols-3 gap-1'>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.posts.map((post, i) => (
              <PostBox key={i} post={post} />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div ref={trackingRef} className='flex-center flex-col'>
        {(isFetching || isFetchingNextPage) && <Spinner />}
      </div>
    </>
  );
};
