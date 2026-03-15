import { Button } from '../ui/button';

export const PostsEmptyMessage = () => {
  return (
    <div className='flex-center flex-col gap-4'>
      <div className='flex-center flex-col gap-1'>
        <h3 className='text-md text-neutral-25 text-center font-bold -tracking-[0.02rem]'>
          Your story starts here
        </h3>
        <p className='text-center text-sm font-normal -tracking-[0.01rem] text-neutral-400'>
          Share your first post and let the world see your moments, passions,
          and memorie. Make this space truly yours.
        </p>
      </div>

      <Button className='h-10 max-w-64.75 text-sm font-bold'>
        Upload My First Post
      </Button>
    </div>
  );
};
