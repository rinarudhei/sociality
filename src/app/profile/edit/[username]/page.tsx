import { Navbar } from '@/components/container/navbar';
import { EditProfileForm } from '@/features/user/components/editProfileForm';
import { EditProfile } from './partial/EditProfile';

export default function EditProfilePage() {
  return (
    <div className='flex-center flex-col'>
      <Navbar />
      <EditProfile />
    </div>
  );
}
