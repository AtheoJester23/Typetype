import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface referenceState {
    data: any[],
    mode: string,
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    err: string | null
}

const initialState: referenceState = {
    data: [],
    mode: 'Ten%20Commandments',
    status: 'idle',
    err: null
}

export const fetchData = createAsyncThunk(
    "referenceSlice/fetchData",
    async (choice) => {
        const res = await fetch(`https://typetypeapi-976af-default-rtdb.firebaseio.com/${choice ? `${choice}.json` : "Quotes.json"}`);

        if(!res.ok){
            throw new Error(`Error Occured: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        return data;

    }
)

const referenceSlice = createSlice({
    name: 'referenceSlice',
    initialState,
    reducers: {
        setMode(state, action){
            state.mode = action.payload
        }
    },
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

export const {setMode} = referenceSlice.actions
export default referenceSlice.reducer;
