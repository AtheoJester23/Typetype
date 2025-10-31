import { createSlice } from "@reduxjs/toolkit";

interface configState {
    punctuation: boolean,
    numbers: boolean
}

const initialState: configState = {
    punctuation: true,
    numbers: true
}

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setPunctuation(state, action){
            state.punctuation = action.payload
        },
        setNumbers(state, action){
            state.numbers = action.payload
        }
    }
})

export const {setPunctuation, setNumbers} = configSlice.actions;
export default configSlice.reducer