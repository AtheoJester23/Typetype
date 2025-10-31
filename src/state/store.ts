import { configureStore} from "@reduxjs/toolkit";
import loadingReducer from "./Loading/loadingSlice";
import scoringReducer from "./Scoring/scoring";
import referenceReducer from "./references/referenceSlice"
import configReducer from "./Config/configSlice"

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        scoring: scoringReducer,
        fetching: referenceReducer,
        config: configReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;