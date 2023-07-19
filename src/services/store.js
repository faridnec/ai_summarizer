import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

//configuring a store, Store is a global state for entire data in the app
export const store = configureStore({
    //for specific state => articleApi
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },//only grab what we need
    //do smth w the state before we get it
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})