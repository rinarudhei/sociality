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
  email: string;
  phone: string;
  profilePhoto: string;
  role: string;
};

export type RegisterApiParams = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
