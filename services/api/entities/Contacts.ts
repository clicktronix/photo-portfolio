import { autobind } from 'core-decorators';

import { convertContacts } from '../converters/contacts';
import { ContactsResponse } from '../types/models/contacts';

import { BaseApi } from './BaseApi';

class Contacts extends BaseApi {
  @autobind
  public async getContacts() {
    const response = await this.actions.get<ContactsResponse>({
      url: '/contacts',
    });

    return convertContacts(response.data);
  }
}

export { Contacts };
