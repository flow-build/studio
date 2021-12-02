import axios from 'axios'
import api from '../config/axios'

export const getWorkflowToken = async () => {
    try {
        const response =  await axios.post(
            `${process.env.REACT_APP_BASE_URL}/token`, {}
        )

        return response.data.jwtToken || response.data.token
    } catch(e) {
        throw new Error(`getWorkflowMessage: ${e.message}`)
    }
}

export const getWorkflows = async () => {
    try {
        const response = await api.get(`${process.env.REACT_APP_BASE_URL}/workflows`)

        return response.data
    } catch(e) {
        throw new Error(`getWorkflows: ${e.message}`)
    }
}