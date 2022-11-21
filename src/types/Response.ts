export type Response<T> = {
  code: string;
  message: string;
  payload: T[];
};
