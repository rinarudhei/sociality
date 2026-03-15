'use client';
import { SocialityMenu } from '@/app/partials/socialityMenu';
import { Navbar } from '@/components/container/navbar';
import { ProfileContent } from './partials/profileContent';

export default function Profile() {
  return (
    <div className='flex-center flex-col'>
      <Navbar />
      <ProfileContent />
      <SocialityMenu />
    </div>
  );
}
