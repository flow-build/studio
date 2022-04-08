import { api } from 'services/api'

export const getAnonymousToken = async () => {
  try {
    const response = await api.post('/token', {});
    return response.data.jwtToken || response.data.token
  } catch (e: any) {
    throw new Error(`getWorkflowAnonymousToken -> ${e.error}: ${e.message}`)
  }
}