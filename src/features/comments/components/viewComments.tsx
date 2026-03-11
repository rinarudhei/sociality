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
import ErrorMessage from '@/components/container/errorMessage';
import { Spinner } from '@/components/ui/spinner';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  generateAvatarFallback,
  generateUploadTimeDiffString,
} from '@/lib/utils';
import { useOnInView } from 'react-intersection-observer';
import { Separator } from '@/components/ui/separator';
import { Author } from '@/features/post/types/post';
import { Ellipsis } from 'lucide-react';
import { group } from 'console';
import Image from 'next/image';

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
        className='w-full overflow-y-scroll xl:h-180 xl:h-full xl:w-300 xl:max-w-300 xl:flex-row xl:gap-0'
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
        <div className='flex h-full w-full max-w-120 flex-col gap-3 overflow-y-scroll bg-neutral-950 px-4 pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] xl:h-180 [&::-webkit-scrollbar]:hidden'>
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

            {isError ? (
              <ErrorMessage errorMessage='Failed loading user data' />
            ) : isPending || isFetching ? (
              <Spinner />
            ) : (
              <>
                {data.pages.length === 0 ||
                data.pages[0].comments.length === 0 ? (
                  <div className='flex-center mx-auto h-full max-h-38.75 w-full max-w-90.25 flex-col gap-1'>
                    <p className='text-neutral-25 text-md text-center font-bold -tracking-[0.02rem]'>
                      No Comments yet
                    </p>
                    <p className='text-center text-sm font-normal -tracking-[0.02rem] text-neutral-400'>
                      Start the conversation
                    </p>
                  </div>
                ) : (
                  <ul className='flex h-full w-full flex-col gap-5'>
                    {data.pages.map((group, i) => (
                      <React.Fragment key={i}>
                        {group.comments.map((comment) => (
                          <li
                            key={comment.id}
                            className='flex w-full flex-col gap-3'
                          >
                            <div className='flex w-full flex-col gap-2.5'>
                              <div className='flex-center w-full gap-2'>
                                <Avatar className='size-10'>
                                  <AvatarImage
                                    src={comment.author.avatarUrl}
                                    alt='User Profile Picture'
                                    className='object-contain'
                                  />

                                  <AvatarFallback>
                                    {generateAvatarFallback(
                                      comment.author.name
                                    )}
                                  </AvatarFallback>
                                </Avatar>

                                <div className='flex h-10.5 w-full flex-col items-center gap-0'>
                                  <h4 className='text-neutral-25 w-full text-xs font-semibold tracking-normal sm:text-sm sm:font-bold sm:-tracking-[0.01rem]'>
                                    {comment.author.name}
                                  </h4>
                                  <p className='h-4 w-full text-xs font-normal -tracking-[0.03rem] text-neutral-400 sm:tracking-normal'>
                                    {generateUploadTimeDiffString(
                                      comment.createdAt
                                    )}
                                  </p>
                                </div>
                              </div>

                              <p className='text-neutral-25 text-xs font-normal -tracking-[0.03rem] sm:text-sm sm:-tracking-[0.02rem]'>
                                {comment.text}
                              </p>
                            </div>
                            <Separator className='bg-neutral-900' />
                          </li>
                        ))}
                      </React.Fragment>
                    ))}

                    <div ref={trackingRef} className='flex-center flex-col'>
                      {(isFetching || isFetchingNextPage) && <Spinner />}
                    </div>
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
