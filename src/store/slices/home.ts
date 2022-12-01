import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    scrollTop: 0
}

export const slice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        saveScrollTop(state, action: PayloadAction<number>) {
            return {
                scrollTop: action.payload
            }
        }
    }
})

export const { saveScrollTop } = slice.actions

export default slice.reducer