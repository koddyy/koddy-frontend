export interface ResponseType<T> {
  code: string;
  message?: string;
  data: T;
}
