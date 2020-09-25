import { AxiosRequestConfig } from 'axios';

export type HttpActionParams = {
  url: string;
  options?: AxiosRequestConfig;
  data?: any;
};

export type Converter<R, T> = (resp: R) => T;

export type DataResponse<R> = {
  data: R;
  request: XMLHttpRequest;
};

export type ErrorResponse = {
  message?: string;
  code?: number;
};
