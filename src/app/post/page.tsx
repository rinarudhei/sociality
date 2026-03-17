import { Navbar } from '@/components/container/navbar';
import { AddPostForm } from '@/features/post/components/addPostForm';

export default function Post() {
  return (
    <div className='flex-center flex-col'>
      <Navbar />
      <AddPostForm />
    </div>
  );
}
