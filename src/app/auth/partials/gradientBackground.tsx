'use client';
import Image from 'next/image';
import useMedia from 'use-media';

export const GradientBackground = () => {
  const isLargeIsh = useMedia({ minWidth: '640px' });
  return (
    <div className='absolute bottom-0 z-0 h-[233.19px] w-[110%] sm:-bottom-10 sm:h-[50%] md:h-[60%] lg:h-[80%] xl:h-full'>
      <Image
        src={isLargeIsh ? '/image/Gradient-xl.png' : '/image/Gradient-sm.png'}
        alt='Background'
        fill
        className='object-cover'
        priority
        quality={100}
      />
    </div>
  );
};
