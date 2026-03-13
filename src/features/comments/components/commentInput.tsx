import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
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
      <div className='flex-center h-12 w-12 gap-2 rounded-xl border border-neutral-900 p-3'>
        <Smile size={24} className='h-full w-full' />
      </div>

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
