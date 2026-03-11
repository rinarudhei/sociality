import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Author, GetPostsResponse } from '../types/post';
import { generateUploadTimeDiffString } from '@/lib/utils';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useLikeAPost, useUnlikeAPost } from '@/features/likes/hooks/mutations';
import { useAppSelector } from '@/stores/store';
import { ViewLikes } from '@/features/likes/components/viewLikes';
import { ViewComments } from '@/features/comments/components/viewComments';

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
  const auth = useAppSelector((state) => state.auth);
  const [likedByMeClient, setLikedByMeClient] = React.useState(likedByMe);
  const [likeCountClient, setLikeCountClient] = React.useState(likeCount);
  const [commentCountClient, setCommentCountClient] =
    React.useState(commentCount);

  const [triggerFetchLikes, setTriggerFetchLikes] = React.useState(false);
  const [triggerFetchComments, setTriggerFetchComments] = React.useState(false);

  const { mutate } = useLikeAPost(
    {
      setLikeCount: setLikeCountClient,
      setLikedByMe: setLikedByMeClient,
      setTriggerFetch: setTriggerFetchLikes,
    },
    id
  );

  const { mutate: mutateUnlike } = useUnlikeAPost(
    {
      setLikeCount: setLikeCountClient,
      setLikedByMe: setLikedByMeClient,
      setTriggerFetch: setTriggerFetchLikes,
    },
    id
  );
  useEffect(() => {
    const checkClamp = () => {
      const element = captionRef.current;
      if (element) {
        setIsClamped(element.scrollHeight > element.clientHeight);
      }
    };

    checkClamp();
  }, []);

  const handleClickLike = () => {
    mutate({ id, token: auth.token });
  };

  const handleClickUnlike = () => {
    mutateUnlike({ id, token: auth.token });
  };

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
        <div className='relative h-90.25 w-90.25 sm:h-150 sm:w-150'>
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
      <div className='flex items-center justify-between'>
        {/* actions */}
        <div className='sm:text-md text-neutral-25 flex items-center gap-3 text-sm font-semibold -tracking-[0.02rem] sm:gap-4'>
          <div className='flex items-center gap-1.5'>
            <div
              className='h-6 w-6 cursor-pointer'
              onClick={likedByMeClient ? handleClickUnlike : handleClickLike}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={clsx(
                  likedByMeClient
                    ? 'fill-red stroke-red'
                    : 'stroke-neutral-25 fill-none'
                )}
              >
                <path
                  d='M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <ViewLikes
              id={id}
              triggerFetch={triggerFetchLikes}
              setTriggerFetch={setTriggerFetchLikes}
            >
              <p className='cursor-pointer'>{likeCountClient}</p>
            </ViewLikes>
          </div>
          <ViewComments
            imageUrl={imageUrl}
            author={author}
            triggerFetch={triggerFetchComments}
            setTriggerFetch={setTriggerFetchComments}
            id={id}
            caption={caption}
            uploadedAt={createdAt}
          >
            <div className='flex cursor-pointer items-center gap-1.5'>
              <div className='h-6 w-6'>
                <Image
                  src='/svg/Comment Icon.svg'
                  alt='comment icon svg'
                  width={24}
                  height={24}
                />
              </div>
              <p>{commentCountClient}</p>
            </div>
          </ViewComments>
          <div className='h-6 w-6 cursor-pointer'>
            <Image
              src='/svg/Share Icon.svg'
              alt='share icon svg'
              width={24}
              height={24}
            />
          </div>
        </div>
        {/* save */}
        <div className='h-6 w-6 cursor-pointer'>
          <Image
            src='/svg/Save icon.svg'
            alt='save button icon svg'
            width={24}
            height={24}
          />
        </div>
      </div>

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
