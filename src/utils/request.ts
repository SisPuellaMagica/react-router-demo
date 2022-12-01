import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/localStorage'
import history from '@/router/history'
import store from '@/store'
import { logout } from '@/store/slices/user'

const request = axios.create({
    baseURL: '/api',
    timeout: 3000
})

request.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers!.Authorization = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        return response.data.data
    },
    error => {
        if (!error.response) {
            message.error('网络超时', 1)
            return Promise.reject(error)
        }
        if (error.response.status !== 401) {
            message.error(error.response.data.message || error.response.statusText, 1)
            return Promise.reject(error)
        }
        // 401
        store.dispatch(logout())
        history.replace('/login', { from: history.location.pathname })
        return Promise.reject(error)
    }
)

export default request