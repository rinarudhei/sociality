import { User } from '@/features/user/types/user';
import { Pagination } from '@/types/pagination';

export type GetLikesbyPostIdParams = {
  id: number;
  page: number;
  limit: number;
};

export type GetLikesByPostIdResponse = {
  users: User[];
  pagination: Pagination;
};

export type LikeAPostResponse = {
  liked: boolean;
  likeCount: number;
};

export type UnlikeAPostResponse = LikeAPostResponse;
