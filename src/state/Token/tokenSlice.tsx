import { createSlice } from "@reduxjs/toolkit";

type theToken = {
    token: String | null,
    expiration: String | null
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