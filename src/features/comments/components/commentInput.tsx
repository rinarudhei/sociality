import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { emoticons } from '@/constants/type-emoticons';
import clsx from 'clsx';
import { Smile } from 'lucide-react';
import { SetStateAction } from 'react';

type CommentInputProps = {
  setTextComment: React.Dispatch<SetStateAction<string>>;
  textComment: string;
  handleSubmit: () => void;
};
export const CommentInput = ({
  setTextComment,
  textComment,
  handleSubmit,
}: CommentInputProps) => {
  return (
    <div className='flex gap-2'>
      <Popover>
        <PopoverTrigger>
          <div className='flex-center h-12 w-12 gap-2 rounded-xl border border-neutral-900 p-3'>
            <Smile size={24} className='h-full w-full cursor-pointer' />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          sideOffset={10}
          className='left-0 mx-0 mb-2.5 rounded-xl border border-neutral-900 bg-neutral-950 p-0'
        >
          <div className='grid grid-cols-6 grid-rows-3 gap-2.5 p-4'>
            {emoticons.map((emote, i) => (
              <div
                key={i}
                className='h-full w-full text-center text-2xl leading-10'
                onClick={() => setTextComment((prev) => prev + emote)}
              >
                {emote}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <InputGroup className='h-12 gap-2 rounded-xl border border-neutral-900 px-4 py-2 xl:w-96'>
        <InputGroupInput
          id='add-comment'
          autoComplete='off'
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
          placeholder='Add Comment'
          className='gap-0 p-0 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-neutral-600'
        />
        <InputGroupAddon align='inline-end' className='m-0 w-fit gap-0 p-0'>
          <Button
            variant='ghost'
            onClick={handleSubmit}
            className={clsx(
              'w-fit border-none text-right text-sm font-bold -tracking-[0.01rem]',
              textComment.length > 0
                ? 'text-primary-200 hover:text-primary-200/90 cursor-pointer hover:bg-transparent'
                : 'pointer-events-none text-neutral-600'
            )}
          >
            Post
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
