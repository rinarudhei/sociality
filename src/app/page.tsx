import Image from 'next/image';
import Auth from './auth/partials/auth';
import { Navbar } from '@/components/container/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
    </div>
  );
}
