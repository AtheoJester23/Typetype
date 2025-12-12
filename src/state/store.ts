import { configureStore} from "@reduxjs/toolkit";
import loadingReducer from "./Loading/loadingSlice";
import scoringReducer from "./Scoring/scoring";
import referenceReducer from "./references/referenceSlice"
import configReducer from "./Config/configSlice"
import tokenReducer from "./Token/tokenSlice"
import collectionReducer from "./Collections/collectionSlice"
import authReducer from "./AuthState/authSlice"

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        scoring: scoringReducer,
        fetching: referenceReducer,
        config: configReducer,
        token: tokenReducer,
        collections: collectionReducer,
        authState: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;