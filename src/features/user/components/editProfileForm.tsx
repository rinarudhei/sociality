import { Controller, useForm } from 'react-hook-form';
import { editProfileSchema } from '../schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { UserProfileDetail } from '../types/user';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateAvatarFallback } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { usePatchProfile } from '../hooks/mutations';
import { Spinner } from '@/components/ui/spinner';
import { isPending } from '@reduxjs/toolkit';
import { useAppSelector } from '@/stores/store';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';

type EditProfileFormProps = {
  user: UserProfileDetail;
};

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    user.avatarUrl
  );
  const auth = useAppSelector((state) => state.auth);
  const currentUser = useAppSelector((state) => state.user);
  const { mutate, isPending } = usePatchProfile();
  const editProfileForm = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      avatarUrl: user.avatarUrl || '',
      avatar: '',
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
      bio: user.bio || '',
    },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      editProfileForm.setError('avatar', {
        type: 'manual',
        message: 'Please upload an image file.',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      editProfileForm.setError('avatar', {
        type: 'manual',
        message: 'File size must be less than 5MB.',
      });
      return;
    }

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   const base64String = reader.result as string;
    //   editProfileForm.setValue('avatar', base64String);
    // };
    // reader.readAsDataURL(file);

    editProfileForm.setValue('avatar', file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewAvatar(previewUrl);
  };

  function onSubmit(data: z.infer<typeof editProfileSchema>) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('bio', data.bio);
    formData.append('avatar', data.avatar);
    formData.append('phone', data.phone);

    mutate({
      formData,
      token: auth.token,
    });
  }

  return (
    <form
      id='form-edit-profile'
      onSubmit={editProfileForm.handleSubmit(onSubmit)}
      className='flex w-full max-w-90.25 flex-col gap-4 sm:max-w-150 lg:max-w-200'
    >
      <FieldGroup className='sm:flex-row sm:gap-12'>
        <div className='flex w-full flex-col gap-4 sm:max-w-40'>
          <Controller
            name='avatar'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className='flex-center flex-col gap-4'>
                  <Avatar className='size-20 sm:size-32.5'>
                    <AvatarImage
                      src={previewAvatar || field.value}
                      alt='User Profile Picture'
                      className=''
                    />

                    <AvatarFallback className='text-2xl'>
                      {generateAvatarFallback(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() =>
                      document.getElementById('avatar-upload')?.click()
                    }
                    className='text-neutral-25 sm:text-md h-10 w-40 text-sm font-bold -tracking-[0.01rem] sm:h-12 sm:-tracking-[0.02rem]'
                  >
                    Change Photo
                  </Button>
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleAvatarChange}
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className='flex w-full flex-col gap-4 sm:gap-6'>
          {/* Name Field */}
          <Controller
            name='name'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-sm font-bold -tracking-[0.02rem] text-white'>
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='John Doe'
                  value={field.value || user.name}
                  onChange={field.onChange}
                  className='w-full border border-neutral-900! bg-neutral-950!'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='username'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-sm font-bold -tracking-[0.02rem] text-white'>
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='johndoe'
                  value={field.value || user.username}
                  onChange={field.onChange}
                  className='border border-neutral-900 bg-neutral-950'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='email'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-sm font-bold -tracking-[0.02rem] text-white'>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='johndoe@email.com'
                  value={field.value || user.email}
                  onChange={field.onChange}
                  disabled
                  className='disabled:border disabled:border-neutral-900 disabled:bg-neutral-950 disabled:text-white disabled:opacity-100'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='phone'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-sm font-bold -tracking-[0.02rem] text-white'>
                  Number Phone
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='081234567890'
                  className='border border-neutral-900! bg-neutral-950! placeholder:border placeholder:border-neutral-900 placeholder:bg-neutral-950'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='bio'
            control={editProfileForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className='text-sm font-bold -tracking-[0.02rem] text-white'>
                  Bio
                </FieldLabel>
                <Textarea
                  {...field}
                  placeholder='Create your bio'
                  className={clsx(
                    'rounded-xl border border-neutral-900 bg-neutral-950 text-wrap',
                    'md:text-md',
                    'px-4 py-2'
                  )}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type='submit'
            form='form-edit-profile'
            className='w-full cursor-pointer'
            disabled={isPending}
          >
            {isPending ? <Spinner /> : 'Save Changes'}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
