export type Storage = {
  set<T>(key: string, item: T): void;
  get<T, D>(key: string, def: D): T | D;
  del(key: string): void;
};
