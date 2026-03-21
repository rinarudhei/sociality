export type LoginApiParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: RegisterResponse;
};

export type RegisterResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  profilePhoto: string;
  role: string;
};

export type RegisterApiParams = {
  username: string;
  email: string;
  name: string;
  phone: string;
  password: string;
};
