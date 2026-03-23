'use client';
import ErrorMessage from '@/components/container/errorMessage';
import { Spinner } from '@/components/ui/spinner';
import { EditProfileForm } from '@/features/user/components/editProfileForm';
import { useGetUserByUsername } from '@/features/user/hooks/queries';
import { useAppSelector } from '@/stores/store';

export const EditProfile = () => {
  const { username } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.auth);
  const { data, isPending, isError } = useGetUserByUsername({
    username,
    token,
  });
  return (
    <div className='absolute top-20 flex w-full flex-col items-center sm:top-30'>
      {isError ? (
        <ErrorMessage errorMessage='Failed fetching data' />
      ) : isPending ? (
        <Spinner />
      ) : (
        <EditProfileForm
          user={{
            name: data.name,
            username: data.username,
            bio: data.bio,
            avatarUrl: data.avatarUrl,
            phone: data.phone,
            email: data.email,
          }}
        />
      )}
    </div>
  );
};
