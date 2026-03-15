import { Metric } from '@/constants/user-metrics';

type MetricBoxProps = {
  metric: Metric;
  counts: { post: number; followers: number; following: number; likes: number };
};
export const MetricBox = ({ metric, counts }: MetricBoxProps) => {
  return (
    <div className='flex-center w-[54.25px] flex-col gap-0.5'>
      <h5 className='text-neutral-25 text-center text-lg font-bold -tracking-[0.03rem]'>
        {metric === 'Post' && counts.post}
        {metric === 'Followers' && counts.followers}
        {metric === 'Following' && counts.following}
        {metric === 'Likes' && counts.likes}
      </h5>
      <p className='text-center text-xs font-normal tracking-normal text-neutral-400'>
        {metric}
      </p>
    </div>
  );
};
