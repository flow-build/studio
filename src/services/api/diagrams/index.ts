import axios from "axios";
import { getStorageItem } from "shared/utils/storage";

export const api = axios.create({
  baseURL: "http://diagrams.flowbuild.com.br:3000",
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
