'use client';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const SocialityMenu = () => {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-4 flex h-16 w-86.25 items-center justify-around rounded-full border border-neutral-900 bg-neutral-950 shadow-sm sm:bottom-8 sm:h-20 sm:w-90'>
      {/* Go Home Menu */}
      <div className='flex w-23.5 flex-col items-center gap-0.5 sm:gap-1'>
        <div className='flex-center size-6'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={clsx(
              pathname === '/' ? 'fill-primary-200' : 'fill-neutral-25'
            )}
          >
            <path d='M20.0402 6.81969L14.2802 2.78969C12.7102 1.68969 10.3002 1.74969 8.79023 2.91969L3.78023 6.82969C2.78023 7.60969 1.99023 9.20969 1.99023 10.4697V17.3697C1.99023 19.9197 4.06023 21.9997 6.61023 21.9997H17.3902C19.9402 21.9997 22.0102 19.9297 22.0102 17.3797V10.5997C22.0102 9.24969 21.1402 7.58969 20.0402 6.81969ZM12.7502 17.9997C12.7502 18.4097 12.4102 18.7497 12.0002 18.7497C11.5902 18.7497 11.2502 18.4097 11.2502 17.9997V14.9997C11.2502 14.5897 11.5902 14.2497 12.0002 14.2497C12.4102 14.2497 12.7502 14.5897 12.7502 14.9997V17.9997Z' />
          </svg>
        </div>
        <div
          className={clsx(
            'sm:text-md text-center text-xs font-normal tracking-normal sm:-tracking-[0.02rem]',
            pathname === '/' ? 'text-primary-200' : 'text-neutral-25'
          )}
        >
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
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={clsx(
              pathname === '/profile' ? 'fill-primary-200' : 'fill-neutral-25'
            )}
          >
            <path d='M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z' />
            <path d='M17.08 14.1499C14.29 12.2899 9.73996 12.2899 6.92996 14.1499C5.65996 14.9999 4.95996 16.1499 4.95996 17.3799C4.95996 18.6099 5.65996 19.7499 6.91996 20.5899C8.31996 21.5299 10.16 21.9999 12 21.9999C13.84 21.9999 15.68 21.5299 17.08 20.5899C18.34 19.7399 19.04 18.5999 19.04 17.3599C19.03 16.1299 18.34 14.9899 17.08 14.1499Z' />
          </svg>
        </div>
        <div
          className={clsx(
            'text-neutral-25 sm:text-md text-center text-xs font-normal tracking-normal sm:-tracking-[0.02rem]',

            pathname === '/profile' ? 'text-primary-200' : 'text-neutral-25'
          )}
        >
          Profile
        </div>
      </div>
    </div>
  );
};
