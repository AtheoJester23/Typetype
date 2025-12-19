import { createSlice } from "@reduxjs/toolkit";

type theToken = {
    token: string | null,
    expiration: string | null
}

const initialState: theToken = {
    token: null,
    expiration: null
}

const tokenSlice = createSlice({
    name: "sliceToken",
    initialState,
    reducers: {
        setToken(state, action){
            state.token = action.payload
        }
    }
})

export const {setToken} = tokenSlice.actions
export default tokenSlice.reducer;