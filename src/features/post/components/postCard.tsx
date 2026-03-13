import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Author } from '../types/post';
import { generateUploadTimeDiffString } from '@/lib/utils';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { PostMenuButtons } from '@/app/partials/postMenuButtons';

type PostCardProps = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};
export const PostCard = ({
  id,
  imageUrl,
  caption,
  createdAt,
  likeCount,
  commentCount,
  likedByMe,
  author,
}: PostCardProps) => {
  const [showMore, setShowMore] = React.useState(false);
  const [isClamped, setIsClamped] = React.useState(false);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkClamp = () => {
      const element = captionRef.current;
      if (element) {
        setIsClamped(element.scrollHeight > element.clientHeight);
      }
    };

    checkClamp();
  }, []);

  return (
    <div className='flex max-w-91 flex-col gap-2 sm:max-w-150 sm:gap-3'>
      {/* post container */}
      <div className='flex w-full flex-col items-center gap-2 sm:gap-6'>
        {/* author info */}
        <div className='flex w-full gap-3'>
          <Avatar className='h-11 w-11 sm:h-12 sm:w-12'>
            <AvatarImage
              src={author.avatarUrl}
              alt='author profile avatar'
              className='w-full object-contain'
            />
          </Avatar>
          <div className='flex flex-col'>
            <p className='tex-sm sm:text-md text-neutral-25 font-bold -tracking-[0.02rem]'>
              {author.username}
            </p>
            <div className='text-xs font-normal -tracking-[0.02rem] text-neutral-400 sm:text-sm'>
              {generateUploadTimeDiffString(createdAt)}
            </div>
          </div>
        </div>

        {/* post image */}
        <div className='relative h-90.25 w-screen max-w-90.25 sm:h-150 sm:w-150 sm:max-w-full'>
          <Image
            src={imageUrl}
            alt='Post Image'
            width={600}
            height={600}
            className='absolute h-full w-full rounded-md object-fill'
            loading='eager'
          />
        </div>
      </div>

      {/* post menu */}
      <PostMenuButtons
        id={id}
        imageUrl={imageUrl}
        caption={caption}
        author={author}
        likeCount={likeCount}
        likedByMe={likedByMe}
        commentCount={commentCount}
        createdAt={createdAt}
      />

      {/* post caption */}
      <div className='flex flex-col sm:gap-1'>
        <h4 className='sm:text-md text-neutral-25 text-sm font-bold -tracking-[0.01rem] sm:-tracking-[0.02rem]'>
          {author.username}
        </h4>
        <p
          ref={captionRef}
          className={clsx(
            'text-neutral-25 sm:text-md text-sm font-normal -tracking-[0.02rem]',
            !showMore && 'line-clamp-2'
          )}
        >
          {caption}
        </p>
        <div
          className={clsx(
            'text-primary-200 sm:text-md line-clamp-2 cursor-pointer text-sm font-bold -tracking-[0.01rem] sm:-tracking-[0.02rem]',
            !isClamped && 'hidden'
          )}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </div>
      </div>
    </div>
  );
};
