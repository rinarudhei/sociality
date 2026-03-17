import { Post } from '@/features/post/types/post';
import { Pagination } from '@/types/pagination';

export type SearchUserParams = {
  q: string;
  page: number;
  limit: number;
};

export type SearchUserResponse = {
  users: User[];
};

export type User = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
  isFollowedByMe: boolean;
};

export type GetUserByUsernameResponse = {
  id: number;
  username: string;
  bio: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  counts: {
    post: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowedByMe: boolean;
  isFollowing: boolean;
  isMe: boolean;
};

export type GetUserByUsernameParams = {
  token: string;
  username: string;
};

export type GetPostsByUsernameParams = {
  username: string;
  page: number;
  limit: number;
};

export type GetPostsByUsernameResponse = {
  posts: Post[];
  pagination: Pagination;
};

export type GetSavedPostsParams = {
  token: string;
  page: number;
  limit: number;
};

export type GetSavedPostsResponse = GetPostsByUsernameResponse;
