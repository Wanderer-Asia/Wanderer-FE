export type Response<T = any> = {
  message: string;
  pagination: Pagination;
  data: T;
};

export type Pagination = {
  prev: string;
  next: string;
};

export type IResponse<T = any> = {
  message: string;
  data: T;
};

export interface Request {
  keywoard?: string;
  sort?: "price" | "rating";
}
