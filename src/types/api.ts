export type ApiResponse<T> = {
  success: string;
  message: string;
  data: T;
};
