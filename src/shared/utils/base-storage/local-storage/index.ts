import { BaseStorage } from "shared/utils/base-storage";

export class LocalStorage {
  private static instance: BaseStorage;

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new BaseStorage("local");
    }

    return LocalStorage.instance;
  }
}
