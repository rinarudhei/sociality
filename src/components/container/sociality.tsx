import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const Sociality = ({
  isProfile,
  isAddPost,
}: {
  isProfile: boolean;
  isAddPost: boolean;
}) => {
  return (
    <Link
      href='/'
      className={clsx(
        'flex-center gap-2.75',
        isProfile && 'sm:flex-center hidden',
        isAddPost && 'sm:flex-center hidden'
      )}
    >
      <div className='relative h-7.5 w-7.5'>
        <Image
          src='/svg/sociality.svg'
          alt='sociality icon svg'
          fill
          className='absolute'
        />
      </div>
      <h1 className='text-display-xs text-neutral-25 font-bold -tracking-[0.04rem]'>
        Sociality
      </h1>
    </Link>
  );
};
