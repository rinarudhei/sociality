import { SetStateAction } from 'react';

export type FollowUserParams = {
  username: string;
  token: string;
};

export type FollowUserResponse = {
  following: boolean;
};

export type UseFollowUserProps =
  | {
      id: number;
      setTriggerRefetch: React.Dispatch<SetStateAction<boolean>>;
    }
  | { id: null };
