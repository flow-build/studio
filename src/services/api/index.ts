import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAnonymousToken } from "services/resources/token";

import { getStorageItem, setStorageItem } from "shared/utils/storage";

const baseUrl = getStorageItem("SERVER_URL");
const env = `${process.env.REACT_APP_BASE_URL}${":"}${
  process.env.REACT_APP_URL_PORT
}`;

const api = axios.create({
  baseURL: baseUrl ?? env,
});

type TToken = {
  exp: number;
};

function isTokenExpired(token: string) {
  const { exp } = jwt_decode<TToken>(token);
  const expireDate = new Date(exp * 1000).getTime();

  return Date.now() > expireDate;
}

api.interceptors.request.use(
  async (config) => {
    const token = getStorageItem("TOKEN");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error(`Interceptors Request -> ${error.name}: ${error.message}`);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    let token = getStorageItem("TOKEN");

    if (token && isTokenExpired(token)) {
      const decoded = jwt_decode(token) as string;
      token = await getAnonymousToken(decoded);
      setStorageItem("TOKEN", token);

      error.config.headers["Authorization"] = "Bearer " + token;
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

function setBaseUrl(url: string) {
  api.defaults.baseURL = url;
}

export { api, setBaseUrl };
