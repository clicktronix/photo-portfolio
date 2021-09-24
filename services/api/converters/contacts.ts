import { Contacts } from 'models/contacts';

import { ContactsResponse } from '../types/models/contacts';

export function convertContacts(data: ContactsResponse): Contacts {
  return {
    email: data.email,
    phone: data.phone,
    whatsapp: data.whatsapp,
    instagram: data.instagram,
    telegram: data.telegram,
  };
}
