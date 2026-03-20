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
    isRefetching,
  } = useGetSavedPosts({ token: auth.token, page: 1, limit: 10 });

  const trackingRef = useOnInView(
    (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: '200px', threshold: 1.0, triggerOnce: false }
  );

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return isError ? (
    <ErrorMessage errorMessage='Failed loading posts' />
  ) : (isPending || isFetching) && !isFetchingNextPage && !isRefetching ? (
    <Spinner />
  ) : (
    <div className='hide-scroll h-full sm:h-203'>
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
    </div>
  );
};
