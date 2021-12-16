import jwt_decode from "jwt-decode";
import { getWorkflowTokenByActorId } from './workflowService'
import AsyncStorage from '@callstack/async-storage';

import { nanoid } from 'nanoid/async'

export async function getMQTTClientID() {
    const clientId = await AsyncStorage.getItem('@MQTT_CLIENT_ID')

    if(!clientId) {
        const id = await nanoid()

        await AsyncStorage.setItem('@MQTT_CLIENT_ID', id)

        return id;
    }

    return clientId;
}

export async function getMQTTConfig() {
    const clientId = await getMQTTClientID();

    return {
        host: process.env.REACT_APP_MQTT_HOST,
        port: parseInt(process.env.REACT_APP_MQTT_PORT),
        clientId: clientId
    }
}

export async function getActorId() {
    const storedActorId = await AsyncStorage.getItem('actor_id')

    if(!storedActorId) {
        const actorId = await nanoid();

        await AsyncStorage.setItem('actor_id', actorId);

        return actorId;
    }

    return storedActorId;
}

export async function login() {
    const storageToken = await AsyncStorage.getItem('TOKEN')

    if(!storageToken) {
        const actorId = await getActorId()
        const token = await getWorkflowTokenByActorId(actorId)

        const { session_id } = jwt_decode(token)

        await AsyncStorage.setItem('TOKEN', token)
        await AsyncStorage.setItem('@session_id', session_id)
        
        return token
    }

    const { exp } = jwt_decode(storageToken)
    const expireDate = new Date(exp * 1000).getTime()

    if(Date.now() > expireDate) {
        await AsyncStorage.removeItem('TOKEN')
        return login()
    }

    return storageToken
}

export async function getSessionID() {
    const session_id = await AsyncStorage.getItem('@session_id')

    if(!session_id) {
        const token = await login()

        const { session_id } = jwt_decode(token)

        await AsyncStorage.setItem('@session_id', session_id)

        return session_id
    }

    return session_id
}