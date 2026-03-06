import Image from 'next/image';

export const Sociality = () => {
  return (
    <div className='flex-center gap-2.75'>
      <div className='relative h-7.5 w-7.5'>
        <Image
          src='/svg/sociality.svg'
          alt='sociality icon svg'
          fill
          className='absolute'
        />
      </div>
      <h1 className='text-display-xs text-neutral-25 font-bold'>Sociality</h1>
    </div>
  );
};
