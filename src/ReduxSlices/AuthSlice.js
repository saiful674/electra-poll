import { createSlice } from "@reduxjs/toolkit";


const AuthSlice= createSlice({
name: 'auth',
initialState:[],
reducers: {
    add(state,action){
state.push(action.payload)
    },
    remove(state,action){
        state=state.filter(item=>item.id !== action.payload)
    },
}

})

export const {add,remove}=AuthSlice.actions

export default AuthSlice.reducer