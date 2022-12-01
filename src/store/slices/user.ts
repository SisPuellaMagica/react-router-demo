import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { getToken, setToken, removeToken } from '@/utils/localStorage'
import request from '@/utils/request'

type User = {
    id: string,
    name: string,
    avatar: string,
    [key: string]: any
}

const initialState: {
    token: string,
    userInfo: User,
    menus: string[]
} = {
    token: getToken(),
    userInfo: {
        id: '',
        name: '',
        avatar: ''
    },
    menus: []
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<string>) {
            const token = action.payload
            setToken(token)
            return {
                ...state,
                token
            }
        },
        saveUser(state, action: PayloadAction<{ userInfo: User, menus: string[] }>) {
            return {
                ...state,
                userInfo: action.payload.userInfo,
                menus: action.payload.menus
            }
        },
        logout() {
            removeToken()
            return {
                ...initialState,
                token: ''
            }
        }
    }
})

export const { saveToken, saveUser, logout } = slice.actions

export const login = (data: { username: string, password: string }): AppThunk => {
    return async (dispatch, getState) => {
        const { token } = await request({
            url: '/authorization',
            method: 'post',
            data
        }) as { token: string }
        dispatch(saveToken(token))
    }
}

export const getUser = (): AppThunk => {
    return async (dispatch, getState) => {
        const { userInfo, menus } = await request({
            url: 'user'
        }) as {
            userInfo: User,
            menus: string[]
        }
        dispatch(saveUser({ userInfo, menus }))
    }
}

export default slice.reducer