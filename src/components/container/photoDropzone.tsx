import clsx from 'clsx';
import React, { MouseEvent, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { Field, FieldLabel } from '../ui/field';
import { Button } from '../ui/button';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ArrowUpToLine, Trash2 } from 'lucide-react';

type PhotoDropzoneProps = {
  className?: string;
  name: 'image' | 'caption';
  control: Control<{ image: any; caption: string }>;
  setValue: UseFormSetValue<{ image: any; caption: string }>;
};

export const PhotoDropzone = ({
  className,
  name,
  control,
  setValue,
}: PhotoDropzoneProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error, invalid },
      }) => {
        const [mediaPreview, setMediaPreview] = useState<string | StaticImport>(
          ''
        );
        const [isChangeImage, setIsChangeImage] = useState(false);

        const fileInputRef = useRef<HTMLInputElement>(null);

        React.useEffect(() => {
          if (isChangeImage) {
            fileInputRef.current?.click();
            setIsChangeImage(false);
          }
        }, [isChangeImage]);
        const handleDeleteImage = (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          e.preventDefault();
          e.stopPropagation();
          if (mediaPreview) {
            URL.revokeObjectURL(mediaPreview as string);
          }

          setMediaPreview('');
          onChange(null);
        };

        const handleChangeImage = (
          e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ) => {
          if (mediaPreview) {
            URL.revokeObjectURL(mediaPreview as string);
          }

          setMediaPreview('');
          onChange(null);
          setIsChangeImage(true);
          fileInputRef.current?.click();
        };

        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 1) {
              onChange(acceptedFiles);
              const previewURL = URL.createObjectURL(acceptedFiles[0]);
              setMediaPreview(previewURL);
            }
          },
          [onChange]
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
          },
          maxFiles: 1,
          noClick: mediaPreview !== '',
          noKeyboard: mediaPreview !== '',
        });

        return (
          <Field>
            <FieldLabel
              htmlFor='upload-photo-field'
              className='text-neutral-25 text-sm font-bold -tracking-[0.02rem]'
            >
              Photo
            </FieldLabel>
            <div className='flex flex-col gap-0.5'>
              <div
                {...getRootProps()}
                id='upload-photo-field'
                ref={fileInputRef}
                className={clsx(
                  className,
                  'cursor-pointer rounded-lg border-2 border-dashed border-neutral-900 p-8 text-center',
                  error && 'border-red',
                  'flex-center flex-col gap-1 px-6 py-4'
                )}
              >
                <input {...getInputProps()} aria-invalid={invalid} />
                <div
                  className={clsx(
                    'flex-center flex-col gap-3',
                    value && value.length === 1 && 'hidden'
                  )}
                >
                  <div className='flex-center size-10 rounded-md border border-neutral-900'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.66797 13.3333L10.0013 10M10.0013 10L13.3346 13.3333M10.0013 10V17.5M16.668 13.9524C17.6859 13.1117 18.3346 11.8399 18.3346 10.4167C18.3346 7.88536 16.2826 5.83333 13.7513 5.83333C13.5692 5.83333 13.3989 5.73833 13.3064 5.58145C12.2197 3.73736 10.2133 2.5 7.91797 2.5C4.46619 2.5 1.66797 5.29822 1.66797 8.75C1.66797 10.4718 2.36417 12.0309 3.49043 13.1613'
                        stroke='#FDFDFD'
                        strokeWidth='1.66667'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-center text-sm font-semibold -tracking-[0.02rem] text-neutral-600'>
                      <span className='text-primary-200 font-bold'>
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className='text-center text-sm font-semibold -tracking-[0.02rem] text-neutral-600'>
                      PNG or JPG (max. 5mb){' '}
                    </p>
                  </div>
                </div>

                {/* Display selected files */}
                {mediaPreview !== '' && (
                  <div className='flex-center flex-col gap-3'>
                    <div className='h-78.25 w-78.25 sm:h-98.25 sm:w-98.25'>
                      <Image
                        src={mediaPreview}
                        alt='upload picture'
                        width={600}
                        height={600}
                        className='h-78.25 w-auto object-fill sm:h-98.25'
                      />
                    </div>
                    <div className='flex-center gap-3'>
                      <Button
                        className='text-neutral-25 h-10 w-fit cursor-pointer gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 px-3 text-sm font-medium -tracking-[0.03rem]'
                        onClick={(e) => handleChangeImage(e)}
                      >
                        <ArrowUpToLine size={20} />
                        Change Image
                      </Button>
                      <Button
                        className='text-red h-10 w-fit cursor-pointer gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 px-3 text-sm font-medium -tracking-[0.03rem]'
                        onClick={(e) => handleDeleteImage(e)}
                      >
                        <Trash2 size={20} />
                        Delete Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Display error */}
              {error && <p className='text-red text-sm'>{error.message}</p>}
            </div>
          </Field>
        );
      }}
    />
  );
};
