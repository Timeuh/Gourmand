// error returned by the api
export type ApiError = {
  error: {
    code: number;
    message: string;
    details: unknown;
  };
};

export type ApiCollection<T> = {
  type: string;
  count: number;
  items: T[];
};
