import { IStorage } from "./interfaces/IStorage";

export class BaseStorage implements IStorage {
  private readonly APP_KEY = "FLWB";

  public getValueByKey<T>(key: string): T | null {
    if (typeof window === "undefined") {
      return null;
    }

    const concattedKey = `${this.APP_KEY}_${key.toUpperCase()}`;
    const item = window.localStorage.getItem(concattedKey);

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
    window.localStorage.setItem(concattedKey, JSON.stringify(value));

    return true;
  }

  public removeValueByKey(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    const concattedKey = `${this.APP_KEY}_${key.toUpperCase()}`;
    window.localStorage.removeItem(concattedKey);

    return true;
  }

  public removeAll(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    window.localStorage.clear();

    return true;
  }
}
