import { HttpActions } from '../HttpActions';

class BaseApi {
  constructor(protected actions: HttpActions) {}
}

export { BaseApi };
