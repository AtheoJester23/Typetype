import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface referenceState {
    data: any[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    err: string | null
}

const initialState: referenceState = {
    data: [],
    status: 'idle',
    err: null
}

export const fetchData = createAsyncThunk(
    "referenceSlice/fetchData",
    async () => {
        const res = await fetch("https://typetypeapi-976af-default-rtdb.firebaseio.com/.json");

        if(!res.ok){
            throw new Error(`Error Occured: ${res.status}`);
        }

        const data = await res.json();

        return data;
    }
)

const referenceSlice = createSlice({
    name: 'referenceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'pending',
                state.err = null 
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed',
                state.err = action.error.message || "Something went wrong"
            })
    }
})

export default referenceSlice.reducer;
