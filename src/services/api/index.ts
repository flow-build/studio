import axios from "axios";
import jwt_decode from "jwt-decode";
import { getAnonymousToken } from "services/resources/token";

import { getStorageItem, setStorageItem } from "shared/utils/storage";

const baseUrl = getStorageItem("SERVER_URL");
const env = `${process.env.REACT_APP_BASE_URL}${":"}${process.env.REACT_APP_URL_PORT
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

async function refreshToken() {
  let token = getStorageItem("TOKEN");
  const decoded = jwt_decode(token) as string;

  token = await createToken(decoded);

  return token
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

api.interceptors.request.use(
  async (config) => {
    let token = getStorageItem("TOKEN");
    console.log(" token is not expired");
    if (token && isTokenExpired(token) && config.url !== '/token') {
      console.log(" token is expired");
      const refresehdToken = await refreshToken();

      setStorageItem("TOKEN", refresehdToken);
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    }

    return config;
  }
);

function setBaseUrl(url: string) {
  api.defaults.baseURL = url;
}

export { api, setBaseUrl };