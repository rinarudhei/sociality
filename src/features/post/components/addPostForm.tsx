'use client';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { fileUploadSchema } from '../schemas/addPostSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadPost } from '../hooks/mutations';
import { useAppSelector } from '@/stores/store';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { PhotoDropzone } from '@/components/container/photoDropzone';
import { Spinner } from '@/components/ui/spinner';

export const AddPostForm = () => {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (auth.token === '') {
      router.push('/auth');
      toast.error('Please login first');
    }
  }, [auth.token]);

  const formRef = useRef<HTMLFormElement>(null);

  const addPostForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      image: '',
      caption: '',
    },
  });

  const { mutate, isPending } = useUploadPost(user.username);

  function onSubmit(data: z.infer<typeof fileUploadSchema>) {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('caption', data.caption);

    mutate({
      formData: formData,
      token: auth.token,
    });
  }

  return (
    <div className='absolute top-20 flex w-full max-w-113 flex-col gap-6 px-4 sm:top-30'>
      <div className='hidden gap-3 sm:flex'>
        <Link href={'/'}>
          <ArrowLeft size={32} className='text-neutral-25 cursor-pointer' />
        </Link>
        <p className='text-neutral-25 text-display-xs font-bold'>Add Post</p>
      </div>
      <form
        ref={formRef}
        onSubmit={addPostForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FieldGroup className='gap-6'>
          <PhotoDropzone
            name='image'
            control={addPostForm.control}
            setValue={addPostForm.setValue}
          />
          <Controller
            name='caption'
            control={addPostForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor='caption-photo-field'
                  className='text-neutral-25 text-sm font-bold -tracking-[0.02rem]'
                >
                  Caption
                </FieldLabel>
                <Textarea
                  {...field}
                  id='caption-photo-field'
                  placeholder='Create your caption'
                  name='caption'
                  aria-invalid={fieldState.invalid}
                  className={clsx(
                    'h-full min-h-25.25 rounded-xl border border-neutral-900 px-4 py-2',
                    fieldState.invalid && 'border-red'
                  )}
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className='text-red'
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type='submit' className='flex-center'>
          {isPending ? <Spinner /> : 'Share'}
        </Button>
      </form>
    </div>
  );
};
