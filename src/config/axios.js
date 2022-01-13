import axios from 'axios'
import { requestToken  } from '../services/loginService'

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 180000
})

api.interceptors.request.use(
    async (config) => {
        const token = await requestToken()
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error(`Interceptors Request -> ${error.name}: ${error.message}`)
    }
)

export const axiosBaseQuery = ({ baseUrl }) => async (args) => {
    try {
        const result = await api({ ...args, url: baseUrl + args.url })
        return {
            data: result.data
        }
    } catch(e) {
        console.error(`Axios/axiosBaseQuery -> ${e.error}: ${e.message}`)
        return {
            error: {
                status: e.response?.status,
                data: e.response?.data
            }
        }
    }
}

export default api