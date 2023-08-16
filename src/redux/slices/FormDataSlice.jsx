import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    autoDate: '',
    startDate: '',
    endDate: ''
}

const formDataSlice = createSlice({
    name: 'form-data',
    initialState,
    reducers: {
        addFirstPage(state, action) {
            const pl = action.payload
            state.title = pl.title;
            state.autoDate = pl.autoDate;
            state.startDate = pl.startDate;
            state.endDate = pl.endDate;
            state.voteType = pl.voteType;
            state.ballotAccess = pl.ballotAccess;
            state.adminResultAccess = pl.adminResultAccess;
            state.voterResultAccess = pl.voterResultAccess
        }
    }
})

export const { addFirstPage } = formDataSlice.actions

export const formDataReducer = formDataSlice.reducer