import { getWorkflowAnonymousToken } from './workflowService'
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage'
import jwt_decode from "jwt-decode";

export const requestToken = async() => {
    const storageToken = await getStorageItem('TOKEN')

    if(!storageToken) {
        const token = await getWorkflowAnonymousToken()

        await setStorageItem('TOKEN', token)

        return token
    }

    const { exp } = jwt_decode(storageToken)
    const expireDate = new Date(exp * 1000).getTime()

    if(Date.now() > expireDate) {
        await removeStorageItem('TOKEN')
        return requestToken()
    }

    return storageToken
}