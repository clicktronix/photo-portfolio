import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Albums, Photos } from './entities';
import { Contacts } from './entities/Contacts';

class Api {
  public albums: Albums;
  public photos: Photos;
  public contacts: Contacts;
  private actions: HttpActions;
  private headers = {};

  constructor() {
    this.actions = new HttpActions(`${CONFIG.baseUrl}/api/v1`, this.headers);

    this.albums = new Albums(this.actions);
    this.photos = new Photos(this.actions);
    this.contacts = new Contacts(this.actions);
  }
}

export const api = new Api();
