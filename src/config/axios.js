import axios from 'axios'
import { requestToken } from '../services/loginService'

const api = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 180000
})

api.interceptors.request.use(
    async (config) => {
      const token = await requestToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      console.error('Interceptors Request ->', `${error.name}: ${error.message}`)
    }
  )
  
  export default api