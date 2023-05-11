import axios from "axios";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

export const api = axios.create({
  baseURL: process.env.REACT_APP_DIAGRAMS_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    console.error("Erro na requisição do Diagrama", error);
  }
);
