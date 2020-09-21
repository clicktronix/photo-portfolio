import { Storage } from './types';

class MemoryStorage implements Storage {
  private data: { [key: string]: string } = {};

  public set<T>(key: string, item: T): void {
    this.data[key] = JSON.stringify(item);
  }

  public get<T, D>(key: string, def: D): T | D {
    const result = this.data[key] || null;
    const parsed = result ? (JSON.parse(result) as T) : def;

    return parsed;
  }

  public del(key: string) {
    delete this.data[key];
  }
}

export { MemoryStorage };
