'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { SetStateAction } from 'react';
import { VisuallyHidden } from 'radix-ui';
import { LikesList } from './likesList';

type ViewLikesProps = {
  children: React.ReactNode;
  id: number;
  triggerFetch: boolean;
  setTriggerFetch: React.Dispatch<SetStateAction<boolean>>;
};

export const ViewLikes = ({
  children,
  id,
  triggerFetch,
  setTriggerFetch,
}: ViewLikesProps) => {
  const [isOpen, setisOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side='bottom'>
        <div className='flex h-full w-full flex-col gap-3 overflow-y-scroll rounded-t-2xl bg-neutral-950 px-4 pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <SheetTitle className='text-md -tracking-[0.02rem]'>Likes</SheetTitle>
          <div>
            <SheetDescription>
              <VisuallyHidden.Root>
                List of user who likes this post
              </VisuallyHidden.Root>
            </SheetDescription>
            <LikesList
              id={id}
              isOpen={isOpen}
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
