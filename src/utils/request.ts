import axios from 'axios'
import history from '@/router/history'
import store from '@/store'
import { logout, saveToken } from '@/store/slices/user'
import { Toast } from 'antd-mobile'
import { getToken, getRefreshToken } from '@/utils/localStorage'

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
    async error => {
        if (!error.response) {
            Toast.show({
                icon: 'fail',
                content: '网络不通',
                duration: 1000
            })
            return Promise.reject(error)
        }
        if (error.response.status !== 401) {
            Toast.show({
                icon: 'fail',
                content: error.response.data.message || error.response.statusText,
                duration: 1000
            })
            return Promise.reject(error)
        }
        /* 401 */
        // 无 refresh_token
        if (!getRefreshToken()) {
            store.dispatch(logout())
            history.replace('/login', { from: history.location.pathname })
            return Promise.reject(error)
        }
        // 尝试用一个新 axios 刷新
        try {
            // 刷新成功
            const res = await axios({
                url: '/api/authorization',
                method: 'put',
                headers: { Authorization: `Bearer ${getRefreshToken()}` }
            })
            const tokens = {
                token: res.data.data.token as string,
                refresh_token: getRefreshToken()
            }
            store.dispatch(saveToken(tokens))
            // 使用原 axios 重发请求
            return request({
                ...error.config,
                headers: error.config.headers.toJSON()
            })
        }
        // 刷新失败
        catch {
            store.dispatch(logout())
            history.replace('/login', { from: history.location.pathname })
            return Promise.reject(error)
        }
    }
)

export default request