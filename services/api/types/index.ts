import { AxiosRequestConfig } from 'axios';

export type HttpActionParams = {
  url: string;
  options?: AxiosRequestConfig;
  data?: any;
};
