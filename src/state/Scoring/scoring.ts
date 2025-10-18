import { createSlice } from "@reduxjs/toolkit";

interface scoringState {
    score: number,
    perfectScore: number,
    done: boolean,
}

const initialState: scoringState = {
    score: 0,
    perfectScore: 0,
    done: false,
}

const scoring = createSlice({
    name: 'scoring',
    initialState,
    reducers: {
        setScore(state, action){
            state.score = action.payload;
        },
        setPerfectScore(state, action){
            state.perfectScore = action.payload;
        },
        setDone(state, action){
            state.done = action.payload;
        }
    }
})

export const {setScore, setPerfectScore, setDone} = scoring.actions;
export default scoring.reducer;