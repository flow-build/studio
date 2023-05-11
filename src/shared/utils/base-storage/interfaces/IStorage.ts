export interface IStorage {
  getValueByKey<T>(key: string): T | null;

  setValue(key: string, value: any): boolean;

  removeValueByKey(key: string): boolean;

  removeAll(): boolean;
}
