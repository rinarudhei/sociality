import { Post } from '@/features/post/types/post';
import { isPlainObject } from '@reduxjs/toolkit';
import clsx from 'clsx';
import Image from 'next/image';

type PostBoxProps = { post: Post };

export const PostBox = (props: PostBoxProps) => {
  return (
    <div
      className={clsx(
        'sm:max-w-49.6 m-0 h-[119.75px] w-full max-w-[119.75px] rounded-[3px] p-0 sm:h-49.5 sm:max-h-49.5 sm:max-w-49.5 sm:rounded-sm md:h-57 md:max-h-57 md:max-w-60.5 lg:h-67 lg:max-h-67 lg:max-w-67'
      )}
    >
      <Image
        src={props.post.imageUrl}
        alt='Post Image'
        width={268}
        height={268}
        className='h-full w-full rounded-[3px] object-fill sm:rounded-sm'
        loading='eager'
      />
    </div>
  );
};
