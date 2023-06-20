import axios from 'axios';
import { apiConfig } from 'services/config';
import { store } from 'store';
import { setIsLoading } from 'store/slices/loading';

const initialHeader = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7InVzZXJfaWQiOiI2YjRhM2MzYy1iNzY4LTQyNTgtYjA0ZC1lOTgyZmU0ZTUxMWQiLCJhY3Rvcl9pZCI6IjJhNDVhYzkwLTBmOWYtMTFlZS05Njc1LTE5ODg4OTcxOTJmOCIsImNsYWltcyI6W10sInNlc3Npb25faWQiOiIxTmZxdmtWc1lDQnlvbEItUlFoeVMiLCJpYXQiOjE2ODcyODg2NzcsImV4cCI6MTY4NzI5MjI3N30sImFjdG9yX2lkIjoiNTllZDRiNzAtMGZhOC0xMWVlLTk2NzUtMTk4ODg5NzE5MmY4IiwiY2xhaW1zIjpbXSwic2Vzc2lvbl9pZCI6Ikx0OWNZMVZaMllnanRaZ3R4MncwOCIsImlhdCI6MTY4NzI5MjYyMywiZXhwIjoxNjg3Mjk2MjIzfQ.fvSHqfoUI2fKmLLecflEmXtUodLzSfjWto4UpoMrC2k'
} as const;

const api = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: initialHeader
});

api.interceptors.request.use(
  (config) => {
    store.dispatch(setIsLoading(true));
    return config;
  },
  (error) => {
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    store.dispatch(setIsLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setIsLoading(false));

    return Promise.reject({
      ...error,
      message: error?.response?.data?.message ?? error?.message
    });
  }
);

function API() {
  return {
    ...api,
    post: api.post,
    get: api.get,
    put: api.put,
    patch: api.patch,
    delete: api.delete,
    setHeader(header: { [key: string]: string }) {
      api.defaults.headers.common = { ...initialHeader, ...header };
    },
    setBaseUrl(baseUrl: string) {
      api.defaults.baseURL = baseUrl;
    }
  };
}

export default API();
