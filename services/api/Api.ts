import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Storage } from './storage';

class Api {
  private actions: HttpActions;
  private headers = {};

  constructor(public storage: Storage) {
    this.actions = new HttpActions(CONFIG.baseUrl, this.headers);
  }
}

export { Api };
