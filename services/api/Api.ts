import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Albums, Photos } from './entities';

class Api {
  public albums: Albums;
  public photos: Photos;
  private actions: HttpActions;
  private headers = {};

  constructor() {
    this.actions = new HttpActions(`${CONFIG.baseUrl}/api/v1`, this.headers);

    this.albums = new Albums(this.actions);
    this.photos = new Photos(this.actions);
  }
}

export const api = new Api();
