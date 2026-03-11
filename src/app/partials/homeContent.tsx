'use client';
import ErrorMessage from '@/components/container/errorMessage';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { PostCard } from '@/features/post/components/postCard';
import { useGetPosts } from '@/features/post/hooks/post';
import { useAppSelector } from '@/stores/store';
import React from 'react';
import { useOnInView } from 'react-intersection-observer';

export const HomeContent = () => {
  const auth = useAppSelector((state) => state.auth);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPosts({ page: 1, limit: 5 }, auth.token);

  const trackingRef = useOnInView(
    (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: '200px', threshold: 1.0, triggerOnce: false }
  );

  return status === 'pending' ? (
    <Spinner />
  ) : status === 'error' ? (
    <ErrorMessage errorMessage='Error loading posts' />
  ) : (
    <div className='absolute top-[calc(64px+16px)] flex flex-col items-center justify-start gap-4 overflow-x-scroll overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] sm:top-[calc(80px+16px)] sm:gap-6 [&::-webkit-scrollbar]:hidden'>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.posts.map((post, j) => (
            <React.Fragment key={j}>
              <PostCard
                id={post.id}
                imageUrl={post.imageUrl}
                createdAt={post.createdAt}
                author={post.author}
                caption={post.caption}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                likedByMe={post.likedByMe}
              />
              <Separator className='bg-neutral-900' />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      <div ref={trackingRef} className='flex-center flex-col'>
        {(isFetching || isFetchingNextPage) && <Spinner />}
      </div>
    </div>
  );
};
