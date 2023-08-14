const { createSlice } = require("@reduxjs/toolkit")

const initialState = {}

const formDataSlice = createSlice({
    name: 'form-data',
    initialState,
    reducers: {
        addFirstPage(state, action) {
            const pl = action.payload
            state.title = pl.title
        }
    }
})

export const { addFirstPage } = formDataSlice.actions

export const formDataReducer = formDataSlice.reducer