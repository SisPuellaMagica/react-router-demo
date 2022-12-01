import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import user from './slices/user'
import home from './slices/home'

const store = configureStore({
    reducer: {
        user,
        home
    }
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector