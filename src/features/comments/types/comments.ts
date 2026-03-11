import { Author } from '@/features/post/types/post';
import { Pagination } from '@/types/pagination';

export type GetCommentsByPostIdParams = {
  id: number;
  page: number;
  limit: number;
};

export type GetCommentsByPostIdResponse = {
  comments: PostComment[];
  pagination: Pagination;
};

export type PostComment = {
  id: number;
  text: string;
  createdAt: string;
  author: Author;
};

export type AddPostCommentParams = {
  id: number;
  text: string;
  token: string;
};

export type AddPostCommentResponse = {
  id: number;
  text: string;
  createdAt: string;
  author: Author;
};

export type DeleteCommentResponse = {
  commentCount: number;
};
