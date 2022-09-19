import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAnonymousToken } from "services/resources/token";

import { getStorageItem, setStorageItem } from "shared/utils/storage";

const baseUrl = getStorageItem("SERVER_URL");

const api = axios.create({
  baseURL: baseUrl ?? process.env.REACT_APP_BASE_URL,
});

// nodes url
// nodes url
// const nodesUrl = process.env.REACT_APP_NODES_URL;
const apiNodes = axios.create({
  baseURL: process.env.REACT_APP_NODES_URL,
});
// nodes
// nodes url

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
      token = await getAnonymousToken();
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

// API NODES

apiNodes.interceptors.request.use(
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

apiNodes.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    let token = getStorageItem("TOKEN");

    if (token && isTokenExpired(token)) {
      token = await getAnonymousToken();
      setStorageItem("TOKEN", token);

      error.config.headers["Authorization"] = "Bearer " + token;
      return apiNodes.request(error.config);
    }

    return Promise.reject(error);
  }
);

export { api, setBaseUrl, apiNodes };
