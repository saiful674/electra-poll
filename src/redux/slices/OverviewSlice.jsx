import { createSlice } from '@reduxjs/toolkit'

const initialState = { selectedTime: 'option1', voteType: 'test', ballotAccess: 'high', adminResultAccess: 'after', voterResultAccess: 'after' }

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        setSelectedTime(state, action) {
            state.selectedTime = action.payload
        },
        setVoteType(state, action) {
            state.voteType = action.payload
        },
        setBallotAcces(state, action) {
            state.ballotAccess = action.payload
        },
        setAdminResultAccess(state, action) {
            state.adminResultAccess = action.payload
        },
        setVoterResultAccess(state, action) {
            state.voterResultAccess = action.payload
        }
    }
})

export const { setSelectedTime, setVoteType, setBallotAcces, setAdminResultAccess, setVoterResultAccess } = overviewSlice.actions

export const overviewReducer = overviewSlice.reducer