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
  isFollowedByMe: false;
};
