import { createSlice } from "@reduxjs/toolkit";

export type collectionsType = {
    _id: string,
    title: string,
    content: string,
    userId: string,
    createdAt: string,
    collectionName: string,
    collectionId: string
}

type initialType = {
    value: collectionsType[] | null
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