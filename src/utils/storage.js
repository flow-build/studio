const APP_KEY = 'FLWB'

export function getStorageItem(key) {
    if(typeof window === 'undefined') return

    return JSON.parse(window?.sessionStorage.getItem(`${APP_KEY}_${key.toUpperCase()}`))
}

export function setStorageItem(key, value) {
    if(typeof window === 'undefined') return

    return window?.sessionStorage.setItem(`${APP_KEY}_${key.toUpperCase()}`, JSON.stringify(value))
}

export function removeStorageItem(key) {
    if(typeof window === 'undefined') return

    window.sessionStorage.removeItem(`${APP_KEY}_${key.toUpperCase()}`)
}

export function clearStorage() {
    window.sessionStorage.clear()
}