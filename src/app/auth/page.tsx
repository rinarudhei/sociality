import Image from 'next/image';
import Auth from './partials/auth';
import { GradientBackground } from './partials/gradientBackground';

export default function Login() {
  return (
    <div className='flex-center relative h-full min-h-screen overflow-hidden px-6'>
      <GradientBackground />
      <Auth />
    </div>
  );
}
