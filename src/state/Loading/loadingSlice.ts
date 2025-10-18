import { createSlice } from "@reduxjs/toolkit";

interface loadingState{
    isLoading: boolean;
}

const initialState: loadingState = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action){
            state.isLoading = action.payload;
        }
    }
})

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;