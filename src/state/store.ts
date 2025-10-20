import { configureStore} from "@reduxjs/toolkit";
import loadingReducer from "./Loading/loadingSlice";
import scoringReducer from "./Scoring/scoring";
import referenceReducer from "./references/referenceSlice"

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        scoring: scoringReducer,
        fetching: referenceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;