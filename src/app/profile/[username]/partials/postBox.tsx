import { Post } from '@/features/post/types/post';
import Image from 'next/image';

type PostBoxProps = {
  post: Post;
};

export const PostBox = ({ post }: PostBoxProps) => {
  return (
    <div className='relative size-19.75 rounded-[3px] sm:size-67 sm:rounded-sm'>
      <Image
        src={post.imageUrl}
        alt='Post Image'
        width={268}
        height={268}
        className='absolute w-full object-cover'
      />
    </div>
  );
};
