import { getStorageItem, setStorageItem } from '../utils/storage'
import { getWorkflowToken } from './workflowService'

export async function requestToken() {
    const storageToken = getStorageItem('token')
    console.log(!storageToken)

    if(!storageToken) {
        const token = await getWorkflowToken()

        setStorageItem('token', token)
        
        return token
    }

    return storageToken
}