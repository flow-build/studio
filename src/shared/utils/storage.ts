const APP_KEY = 'FLWB'

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return

  const item = window.sessionStorage.getItem(`${APP_KEY}_${key.toUpperCase()}`)

  if (item) {
    return JSON.parse(item)
  }

  return null;
}

export function setStorageItem(key: string, value: any) {
  if (typeof window === 'undefined') return

  return window.sessionStorage.setItem(`${APP_KEY}_${key.toUpperCase()}`, JSON.stringify(value))
}

export function removeStorageItem(key: string) {
  if (typeof window === 'undefined') return

  window.sessionStorage.removeItem(`${APP_KEY}_${key.toUpperCase()}`)
}

export function clearStorage() {
  window.sessionStorage.clear()
} 