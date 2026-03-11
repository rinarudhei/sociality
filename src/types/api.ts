export type ApiResponse<T> = {
  success: string;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  data: unknown;
  message: string;
  success: boolean;
};
