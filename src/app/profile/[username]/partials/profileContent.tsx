import { ProfileInfo } from './profileInfo';
import { Gallery } from './gallery';

export const ProfileContent = () => {
  return (
    <div className='absolute top-20 flex w-full max-w-90.25 flex-col gap-4 sm:top-30 sm:max-w-203 sm:px-10 lg:px-0'>
      <ProfileInfo />
      <Gallery />
    </div>
  );
};
