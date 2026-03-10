import { Plus } from 'lucide-react';
import Image from 'next/image';

export const SocialityMenu = () => {
  return (
    <div className='fixed bottom-4 flex h-16 w-86.25 items-center justify-around rounded-full border border-neutral-900 bg-neutral-950 shadow-sm sm:bottom-8 sm:h-20 sm:w-90'>
      {/* Go Home Menu */}
      <div className='flex w-23.5 flex-col items-center gap-0.5 sm:gap-1'>
        <div className='flex-center size-6'>
          <Image
            src='/svg/Home.svg'
            alt='Home icon svg'
            width={24}
            height={24}
            className='h-auto w-full'
          />
        </div>
        <div className='text-neutral-25 sm:text-md text-center text-xs font-normal tracking-normal sm:-tracking-[0.02rem]'>
          Home
        </div>
      </div>
      {/* Add Post Menu */}
      <div className='bg-primary-300 flex-center size-11 rounded-full border-none sm:size-12'>
        <Plus className='size-5.5 sm:size-6' />
      </div>

      {/* Go Profile Menu */}

      <div className='flex w-23.5 flex-col items-center gap-0.5 sm:gap-1'>
        <div className='flex-center size-6'>
          <Image
            src='/svg/Profile.svg'
            alt='Profile icon svg'
            width={24}
            height={24}
            className='h-auto w-full'
          />
        </div>
        <div className='text-neutral-25 sm:text-md text-center text-xs font-normal tracking-normal sm:-tracking-[0.02rem]'>
          Profile
        </div>
      </div>
    </div>
  );
};
