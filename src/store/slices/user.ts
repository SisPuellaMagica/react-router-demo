import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { getToken, getRefreshToken, setToken, setRefreshToken, removeToken, removeRefreshToken } from '@/utils/localStorage'
import request from '@/utils/request'

type Token = {
    token: string,
    refresh_token: string
}

type User = {
    id: string,
    name: string,
    avatar: string,
    intro: string,
    sex: 0 | 1,
    birthday: string,
    [key: string]: any
}

const initialState: {
    tokens: Token,
    userInfo: User
} = {
    tokens: {
        token: getToken(),
        refresh_token: getRefreshToken()
    },
    userInfo: {
        id: '',
        name: '',
        avatar: '',
        intro: '',
        sex: 1,
        birthday: '',
    }
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<Token>) {
            const { token, refresh_token } = action.payload
            setToken(token)
            setRefreshToken(refresh_token)
            return {
                ...state,
                tokens: action.payload
            }
        },
        saveUser(state, action: PayloadAction<User>) {
            return {
                ...state,
                userInfo: action.payload
            }
        },
        logout() {
            removeToken()
            removeRefreshToken()
            return {
                ...initialState,
                tokens: {
                    token: '',
                    refresh_token: ''
                }
            }
        }
    }
})

export const { saveToken, saveUser, logout } = slice.actions

export const login = (data: { mobile: string, code: string }): AppThunk => {
    return async (dispatch, getState) => {
        const tokens = await request({
            url: '/authorization',
            method: 'post',
            data
        }) as Token
        dispatch(saveToken(tokens))
    }
}

export const getUser = (): AppThunk => {
    return async (dispatch, getState) => {
        const user = await request({
            url: '/user'
        }) as User
        dispatch(saveUser(user))
    }
}

export default slice.reducer