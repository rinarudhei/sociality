import { Navbar } from '@/components/container/navbar';
import { HomeContent } from './partials/homeContent';
import { SocialityMenu } from './partials/socialityMenu';

export default function Home() {
  return (
    <div className='flex-center flex-col'>
      <Navbar />
      <HomeContent />
      <SocialityMenu />
    </div>
  );
}
