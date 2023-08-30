import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ballotType: {}
}

const ballotSlice = createSlice({
    name: 'ballot-page',
    initialState,
    reducers: {
    }
})

export const { } = ballotSlice.actions

export const ballotReducer = ballotSlice.reducer