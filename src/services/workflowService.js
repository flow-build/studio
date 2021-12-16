import axios from 'axios'
import api from '../config/axios'

export const getWorkflowToken = async () => {
    try {
        const response =  await axios.post(
            `${process.env.REACT_APP_BASE_URL}/token`, {}
        )

        return response.data.jwtToken || response.data.token
    } catch(e) {
        throw new Error(`getWorkflowToken: ${e.message}`)
    }
}

export const getWorkflowTokenByActorId = async (actorId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/token`, { actor_id: actorId});

        return response.data.jwtToken || response.data.token
    } catch(e) {
        throw new Error(`getWorkflowTokenByActorId: ${e.message}`)
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

export const createWorkflowByName = async (name, data = {}) => {
    try {
        const response = await api.post(`${process.env.REACT_APP_BASE_URL}/workflows/name/${name}/start`, data)
        
        return response.data
    } catch(e) {
        throw new Error(`createWorkflowByName: ${e.message}`)
    }
}