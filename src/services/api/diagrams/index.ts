import axios from "axios";
import { getStorageItem } from "shared/utils/storage";

export const api = axios.create({
  baseURL: process.env.REACT_APP_DIAGRAMS_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getStorageItem("TOKEN");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    console.error("Erro na requisição do Diagrama", error);
  }
);
