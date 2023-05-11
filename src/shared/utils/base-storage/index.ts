import { IStorage } from "./interfaces/IStorage";

export class BaseStorage implements IStorage {
  private readonly APP_KEY = "FLWB";
  private storage: Storage;

  constructor(type: "local" | "session") {
    this.storage =
      type === "local" ? window.localStorage : window.sessionStorage;
  }

  public getValueByKey<T>(key: string): T | null {
    if (typeof window === "undefined") {
      return null;
    }

    const concattedKey = `${this.APP_KEY}_${key.toUpperCase()}`;
    const item = this.storage.getItem(concattedKey);

    if (item) {
      return JSON.parse(item) as T;
    }

    return null;
  }

  public setValue(key: string, value: any): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const concattedKey = `${this.APP_KEY}_${key.toUpperCase()}`;
    this.storage.setItem(concattedKey, JSON.stringify(value));

    return true;
  }

  public removeValueByKey(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const concattedKey = `${this.APP_KEY}_${key.toUpperCase()}`;
    this.storage.removeItem(concattedKey);

    return true;
  }

  public removeAll(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    this.storage.clear();

    return true;
  }
}
