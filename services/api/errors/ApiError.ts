import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Params = {
  config: AxiosRequestConfig;
  status: number;
  request: XMLHttpRequest;
  response: AxiosResponse;
};

export class ApiError extends Error {
  public config: AxiosRequestConfig;
  public status: number;
  public request: XMLHttpRequest;
  public response: any;

  constructor(params: Params) {
    const { config, status, request, response } = params;
    super(response.data.message);
    this.config = config;
    this.status = status;
    this.request = request;
    this.response = response;
  }
}
