import React from 'react';

import { Api } from './Api';
import { LocalStorage, MemoryStorage } from './storage';

export const ApiContext = React.createContext<Api | null>(null);

export const ApiContextProvider: React.FC = ({ children }) => {
  const storage = LocalStorage.checkAvailability() ? new LocalStorage() : new MemoryStorage();
  const api = new Api(storage);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
