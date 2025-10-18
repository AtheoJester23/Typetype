import { configureStore} from "@reduxjs/toolkit";
import loadingReducer from "./Loading/loadingSlice";
import scoringReducer from "./Scoring/scoring";

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        scoring: scoringReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;