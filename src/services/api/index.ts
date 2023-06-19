import axios from "axios";
import jwt_decode from "jwt-decode";
import { createToken } from "services/resources/token";
import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

const localStorageInstance = LocalStorage.getInstance();
const sessionStorageInstance = SessionStorage.getInstance();

const baseUrl = localStorageInstance.getValueByKey<string>("SERVER_URL");
const env = `${process.env.REACT_APP_BASE_URL}
}`;

const dashboardUrl = localStorageInstance.getValueByKey<string>("DASHBOARD");
const envDashboard = `${dashboardUrl}/embed/dashboard/${dashboardUrl}#theme=night&bordered=true&titled=true`;

const api = axios.create({
  baseURL: baseUrl ?? env,
  url: dashboardUrl ?? envDashboard,
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
    const token = SessionStorage.getInstance().getValueByKey("TOKEN");

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
    let token = sessionStorageInstance.getValueByKey<string>("TOKEN");

    if (token && isTokenExpired(token)) {
      const decoded = jwt_decode(token) as string;
      token = await createToken(decoded);
      sessionStorageInstance.setValue("TOKEN", token);

      error.config.headers["Authorization"] = "Bearer " + token;
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

function setBaseUrl(url: string) {
  api.defaults.baseURL = url;
}

function setDashboardUrl(url: string) {
  api.defaults.url = url;
}

export { api, setBaseUrl, setDashboardUrl };
