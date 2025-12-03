import { createSlice } from "@reduxjs/toolkit";

type collections = {
    _id: string,
    title: string,
    content: string,
    userId: string,
    createdAt: string 
}

type initialType = {
    value: collections[] | null
}

const initialState: initialType = {
    value: null
}

const collectionSlice = createSlice({
    name: "Collections",
    initialState,
    reducers: {
        setCollections(state, action){
            state.value = action.payload
        }
    }
})

export const {setCollections} = collectionSlice.actions;
export default collectionSlice.reducer;