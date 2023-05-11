import { BaseStorage } from "shared/utils/base-storage";

export class SessionStorage {
  private static instance: BaseStorage;

  public static getInstance() {
    if (!SessionStorage.instance) {
      SessionStorage.instance = new BaseStorage();
    }

    return SessionStorage.instance;
  }
}
