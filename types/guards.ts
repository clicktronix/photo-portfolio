import { DataResponse } from 'services/api/types';

export function isDataResponse<R>(data: any): data is DataResponse<R> {
  return Boolean(data.data);
}
