import { createSlice } from '@reduxjs/toolkit'

const initialState = { page: 0 }

const pageNumSlice = createSlice({
    name: 'page-number',
    initialState,
    reducers: {
        next(state) {
            state.page++
        },
        previous(state) {
            state.page--
        }
    }
})

export const { next, previous } = pageNumSlice.actions

export const pageNumReducer = pageNumSlice.reducer