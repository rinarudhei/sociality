'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { SetStateAction } from 'react';
import { useGetCommentsByPostId } from '../hooks/queries';
import { useAppSelector } from '@/stores/store';
import { VisuallyHidden } from 'radix-ui';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  generateAvatarFallback,
  generateUploadTimeDiffString,
} from '@/lib/utils';
import { useOnInView } from 'react-intersection-observer';
import { Separator } from '@/components/ui/separator';
import { Author } from '@/features/post/types/post';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { CommentList } from './comentList';

type ViewCommentsProps = {
  children: React.ReactNode;
  id: number;
  triggerFetch: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  author: Author;
  uploadedAt: string;
  caption: string;
  imageUrl: string;
};

export const ViewComments = ({
  children,
  id,
  triggerFetch,
  setTriggerFetch,
  author,
  uploadedAt,
  caption,
  imageUrl,
}: ViewCommentsProps) => {
  const auth = useAppSelector((state) => state.auth);
  const [isOpen, setisOpen] = React.useState(false);
  const {
    data,
    isPending,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetCommentsByPostId({ id, page: 1, limit: 4 }, isOpen);

  const trackingRef = useOnInView(
    (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { root: null, rootMargin: '200px', threshold: 1.0, triggerOnce: false }
  );

  React.useEffect(() => {
    if (isOpen && triggerFetch) {
      setTriggerFetch(false);
      refetch();
    }
  }, [isOpen, triggerFetch, refetch]);
  return (
    <Sheet open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side='bottom'
        className='w-full overflow-y-scroll xl:h-180 xl:w-300 xl:max-w-300 xl:flex-row xl:gap-0'
      >
        <div className='hidden h-180 w-180 xl:inline-block'>
          <Image
            src={imageUrl}
            alt='Post Image'
            width={720}
            height={720}
            loading='eager'
            className='h-full w-full object-fill'
          />
        </div>
        <div className='flex h-full w-full flex-col gap-3 overflow-y-scroll bg-neutral-950 px-4 pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] xl:h-180 xl:max-w-120 [&::-webkit-scrollbar]:hidden'>
          <SheetHeader className='m-0 hidden w-full flex-col gap-2 p-0 sm:flex'>
            <div className='flex-center h-11.5 w-full items-center gap-2'>
              <Avatar className='size-10'>
                <AvatarImage
                  src={author.avatarUrl}
                  alt='User Profile Picture'
                  className='object-contain'
                />

                <AvatarFallback>
                  {generateAvatarFallback(author.name)}
                </AvatarFallback>
              </Avatar>

              <div className='flex w-full flex-col items-center gap-0'>
                <h4 className='text-neutral-25 w-full text-xs font-semibold tracking-normal sm:text-sm sm:font-bold sm:-tracking-[0.01rem]'>
                  {author.name}
                </h4>
                <p className='h-4 w-full text-xs font-normal -tracking-[0.03rem] text-neutral-400 sm:tracking-normal'>
                  {generateUploadTimeDiffString(uploadedAt)}
                </p>
              </div>

              <Ellipsis size={24} />
            </div>

            <p className='text-neutral-25 text-xs font-normal -tracking-[0.03rem] sm:text-sm sm:-tracking-[0.02rem]'>
              {caption}
            </p>
          </SheetHeader>
          <Separator className='hidden bg-neutral-900 sm:inline-block' />
          <SheetTitle className='text-md -tracking-[0.02rem]'>
            Comments
          </SheetTitle>
          <div className='h-full'>
            <SheetDescription>
              <VisuallyHidden.Root>
                List of user who likes this post
              </VisuallyHidden.Root>
            </SheetDescription>
            <CommentList
              isOpen={isOpen}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              id={id}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
