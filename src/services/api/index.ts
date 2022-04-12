import axios from 'axios'
import { getStorageItem } from 'shared/utils/storage';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use(
  async (config) => {
    const token = getStorageItem('TOKEN');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(`Interceptors Request -> ${error.name}: ${error.message}`)
  }
)

export { api }