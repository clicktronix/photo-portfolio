import { Storage } from './types';

class LocalStorage implements Storage {
  public static checkAvailability() {
    const testKey = '__test__';

    try {
      localStorage.setItem(testKey, '__test-value__');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  private isLocalStorageAvailable: boolean | null = null;

  constructor() {
    this.isLocalStorageAvailable = LocalStorage.checkAvailability();
  }

  public set<T>(key: string, item: T): void {
    if (!this.isLocalStorageAvailable) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(item));
  }

  public get<T, D>(key: string, def: D): T | D {
    let result: T | D = def;
    if (!this.isLocalStorageAvailable) {
      return result;
    }

    const data = localStorage.getItem(key);

    try {
      result = data ? (JSON.parse(data) as T) : def;
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  public del(key: string) {
    if (!this.isLocalStorageAvailable) {
      return;
    }
    localStorage.removeItem(key);
  }
}

export { LocalStorage };
