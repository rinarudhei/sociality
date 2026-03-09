import { Pagination } from '@/types/pagination';

export type GetPostsParams = {
  page: number;
  limit: number;
};

export type GetPostsResponse = { posts: Post[]; pagination: Pagination };

export type Post = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: number;
};

export type Author = {
  id: number;
  username: number;
  name: string;
  avatarUrl: string;
};
