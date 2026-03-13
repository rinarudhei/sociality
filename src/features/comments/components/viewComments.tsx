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
import { useAppSelector } from '@/stores/store';
import { VisuallyHidden } from 'radix-ui';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  generateAvatarFallback,
  generateUploadTimeDiffString,
} from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Author } from '@/features/post/types/post';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { CommentList } from './comentList';
import { useAddComment } from '../hooks/mutations';
import { CommentInput } from './commentInput';
import { PostMenuButtonInComment } from '@/app/partials/postMenuButtonInComments';

type ViewCommentsProps = {
  children: React.ReactNode;
  id: number;
  triggerFetch: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
  setCommentCount: React.Dispatch<SetStateAction<number>>;
  author: Author;
  uploadedAt: string;
  caption: string;
  imageUrl: string;

  likeCountClient: number;
  likedByMeClient: boolean;
  setLikeCountClient: React.Dispatch<SetStateAction<number>>;
  setLikedByMeClient: React.Dispatch<SetStateAction<boolean>>;
  setTriggerFetchLikes: React.Dispatch<SetStateAction<boolean>>;
  triggerFetchLikes: boolean;
  commentCountClient: number;
};

export const ViewComments = ({
  children,
  id,
  triggerFetch,
  setTriggerFetch,
  setCommentCount,
  author,
  uploadedAt,
  caption,
  imageUrl,
  likeCountClient,
  likedByMeClient,
  setLikeCountClient,
  setLikedByMeClient,
  setTriggerFetchLikes,
  triggerFetchLikes,
  commentCountClient,
}: ViewCommentsProps) => {
  const auth = useAppSelector((state) => state.auth);
  const [isOpen, setisOpen] = React.useState(false);
  const [textComment, setTextComment] = React.useState('');
  const { mutate } = useAddComment(
    { setCommentCount, setTriggerFetch, setTextComment },
    id
  );

  const handleSubmit = () => {
    mutate({ id, text: textComment, token: auth.token });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side='bottom'
        className='flex w-full xl:h-180 xl:w-300 xl:max-w-300 xl:flex-row xl:gap-0'
      >
        {/* Post Image only in large screen */}
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

        {/* Comments Section */}
        <div className='relative flex h-full w-full flex-col justify-end gap-3 bg-neutral-950 px-4 pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:max-h-180 sm:gap-4 sm:pb-5 xl:max-h-full xl:min-h-180 xl:max-w-120 xl:justify-start [&::-webkit-scrollbar]:hidden'>
          {/* User Info and caption only if width > mobile screen*/}
          <SheetHeader className='m-0 hidden max-h-[194px] min-h-[194px] w-full flex-col gap-2 p-0 sm:flex'>
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

          {/* Comments Card */}
          <SheetTitle className='text-md -tracking-[0.02rem]'>
            <Separator className='mb-2 hidden bg-neutral-900 sm:inline-block' />
            Comments
          </SheetTitle>
          <div className='h-fit'>
            <SheetDescription>
              <VisuallyHidden.Root>
                List of user who comments on this post
              </VisuallyHidden.Root>
            </SheetDescription>
            <CommentList
              isOpen={isOpen}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              id={id}
            />
          </div>

          {/* Insert Comment Box: Only if user is logged in */}
          {auth.token !== '' && (
            <div className='flex flex-col gap-4 bg-black xl:absolute xl:bottom-5'>
              <PostMenuButtonInComment
                id={id}
                commentCountClient={commentCountClient}
                triggerFetchLikes={triggerFetchLikes}
                likeCountClient={likeCountClient}
                likedByMeClient={likedByMeClient}
                setLikeCountClient={setLikeCountClient}
                setLikedByMeClient={setLikedByMeClient}
                setTriggerFetchLikes={setTriggerFetchLikes}
              />
              <CommentInput
                textComment={textComment}
                setTextComment={setTextComment}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
