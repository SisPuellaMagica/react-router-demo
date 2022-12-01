export const getToken = () => {
    return localStorage.getItem('token') || ''
}

export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token') || ''
}

export const setRefreshToken = (refresh_token: string) => {
    localStorage.setItem('refresh_token', refresh_token)
}

export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token')
}