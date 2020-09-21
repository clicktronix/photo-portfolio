import { AxiosResponse } from 'axios';

import { isDataResponse } from 'types/guards';

import { HttpActions } from '../HttpActions';
import { Storage } from '../storage';
import { Converter } from '../types';
import { isErrorStatus } from '../errors/isErrorStatus';
import { ApiError } from '../errors/ApiError';

class BaseApi {
  protected actions: HttpActions;
  protected storage: Storage;

  get token() {
    return this.storage.get<string, null>('token', null);
  }

  set token(t: string | null) {
    this.storage.set('token', t);
  }

  get refreshToken() {
    return this.storage.get<string, null>('refreshToken', null);
  }

  set refreshToken(t: string | null) {
    this.storage.set('refreshToken', t);
  }

  constructor(actions: HttpActions, storage: Storage) {
    this.actions = actions;
    this.storage = storage;
  }

  protected setHeaders() {
    return { headers: { Authorization: this.token } };
  }

  protected static handleResponse<ResponseData, Result>(
    response: AxiosResponse,
    converter?: Converter<ResponseData, Result> | null,
  ): Result {
    const responseData = (() => {
      if (isDataResponse<ResponseData>(response.data)) {
        return response.data.data;
      }
      return response.data;
    })();
    if (isErrorStatus(response.status)) {
      const { config, status, request } = response;
      throw new ApiError({
        config,
        status,
        request,
        response,
      });
    }
    if (converter) {
      return converter(responseData as ResponseData);
    }
    return responseData;
  }
}

export { BaseApi };
