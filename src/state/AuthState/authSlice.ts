import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    value: "loggedOut" | "pending" | "loggedIn"
}

const initialState = {
    value: "loggedOut"
}

const authSlice = createSlice({
    name: "authState",
    initialState,
    reducers: {
        setLog(state, action){
            state.value = action.payload
        }
    }
})

export const {setLog} = authSlice.actions;
export default authSlice.reducer;