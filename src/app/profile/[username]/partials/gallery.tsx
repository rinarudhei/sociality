import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabContentGallery } from '@/features/user/components/tabContentGallery';
import { TabContentSaved } from '@/features/user/components/tabSaveGallery';

export const Gallery = () => {
  return (
    <Tabs defaultValue='gallery' className='gap-6'>
      {/* Tab List */}
      <TabsList variant='line'>
        <TabsTrigger value='gallery'>
          <div className='flex-center h-12 gap-2 px-6'>
            <div className='size-5'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.4917 1.66699H10.625V6.66699V7.29199V11.4587H18.3333V7.29199V6.66699V6.50866C18.3333 3.47533 16.525 1.66699 13.4917 1.66699Z'
                  fill='#FDFDFD'
                />
                <path
                  d='M1.66663 8.54199V12.7087V13.1253V13.492C1.66663 16.5253 3.47496 18.3337 6.50829 18.3337H9.37496V13.1253V12.7087V8.54199H1.66663Z'
                  fill='#FDFDFD'
                />
                <path
                  d='M9.37496 1.66699V7.29199H1.66663V6.50866C1.66663 3.47533 3.47496 1.66699 6.50829 1.66699H9.37496Z'
                  fill='#FDFDFD'
                />
                <path
                  d='M18.3333 12.708V13.4913C18.3333 16.5247 16.525 18.333 13.4917 18.333H10.625V12.708H18.3333Z'
                  fill='#FDFDFD'
                />
              </svg>
            </div>
            <p className='-tracking-[0.01rem]'>Gallery</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value='saved'>
          <div className='flex-center h-12 gap-2 px-6'>
            <div className='size-5'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M16.8198 2H7.17982C5.04982 2 3.31982 3.74 3.31982 5.86V19.95C3.31982 21.75 4.60982 22.51 6.18982 21.64L11.0698 18.93C11.5898 18.64 12.4298 18.64 12.9398 18.93L17.8198 21.64C19.3998 22.52 20.6898 21.76 20.6898 19.95V5.86C20.6798 3.74 18.9498 2 16.8198 2Z'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16.8198 2H7.17982C5.04982 2 3.31982 3.74 3.31982 5.86V19.95C3.31982 21.75 4.60982 22.51 6.18982 21.64L11.0698 18.93C11.5898 18.64 12.4298 18.64 12.9398 18.93L17.8198 21.64C19.3998 22.52 20.6898 21.76 20.6898 19.95V5.86C20.6798 3.74 18.9498 2 16.8198 2Z'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <p className='-tracking-[0.01rem]'>Saved</p>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value='gallery' className='flex-center'>
        <TabContentGallery />
      </TabsContent>
      <TabsContent value='saved' className='flex-center'>
        <TabContentSaved />
      </TabsContent>
    </Tabs>
  );
};
