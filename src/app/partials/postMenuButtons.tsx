import { ViewComments } from '@/features/comments/components/viewComments';
import { ViewLikes } from '@/features/likes/components/viewLikes';
import { useLikeAPost, useUnlikeAPost } from '@/features/likes/hooks/mutations';
import { Author } from '@/features/post/types/post';
import { useAppSelector } from '@/stores/store';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type PostMenuButtonsProps = {
  id: number;
  likedByMe: boolean;
  likeCount: number;
  commentCount: number;
  author: Author;
  createdAt: string;
  caption: string;
  imageUrl: string;
};

export const PostMenuButtons = ({
  id,
  likedByMe,
  likeCount,
  commentCount,
  author,
  caption,
  createdAt,
  imageUrl,
}: PostMenuButtonsProps) => {
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

  const handleClickLike = () => {
    mutate({ id, token: auth.token });
  };

  const handleClickUnlike = () => {
    mutateUnlike({ id, token: auth.token });
  };
  return (
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
          setCommentCount={setCommentCountClient}
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
  );
};
