import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { getAnonymousToken } from "services/resources/token";

import { getStorageItem, setStorageItem } from "shared/utils/storage";

// export function useApi() {
//   const store = useSelector((state) => state);
//   console.log("store do hook personalizado", store);

const baseUrl = getStorageItem("REACT_APP_FLOWBUILD_HOST");
const basePort = getStorageItem("REACT_APP_FLOWBUILD__PORT");

const api = axios.create({
  baseURL:
    !!baseUrl && !!basePort
      ? `${baseUrl}:${basePort}`
      : process.env.REACT_APP_BASE_URL,
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
      token = await getAnonymousToken();
      setStorageItem("TOKEN", token);

      error.config.headers["Authorization"] = "Bearer " + token;
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

export { api };

// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useSelector } from "react-redux";
// import { getAnonymousToken } from "services/resources/token";

// import { getStorageItem, setStorageItem } from "shared/utils/storage";

// export function useApi() {
//   const store = useSelector((state) => state);
//   console.log("store do hook personalizado", store);

//   const baseUrl = getStorageItem("REACT_APP_FLOWBUILD_HOST");
//   const basePort = getStorageItem("REACT_APP_FLOWBUILD__PORT");

//   const api = axios.create({
//     baseURL:
//       !!baseUrl && !!basePort
//         ? `${baseUrl}:${basePort}`
//         : process.env.REACT_APP_BASE_URL,
//   });

//   type TToken = {
//     exp: number;
//   };

//   function isTokenExpired(token: string) {
//     const { exp } = jwt_decode<TToken>(token);
//     const expireDate = new Date(exp * 1000).getTime();

//     return Date.now() > expireDate;
//   }

//   api.interceptors.request.use(
//     async (config) => {
//       const token = getStorageItem("TOKEN");

//       if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     },
//     (error) => {
//       console.error(`Interceptors Request -> ${error.name}: ${error.message}`);
//     }
//   );

//   api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error: any) => {
//       let token = getStorageItem("TOKEN");

//       if (token && isTokenExpired(token)) {
//         token = await getAnonymousToken();
//         setStorageItem("TOKEN", token);

//         error.config.headers["Authorization"] = "Bearer " + token;
//         return api.request(error.config);
//       }

//       return Promise.reject(error);
//     }
//   );

//   return { api };
// }
