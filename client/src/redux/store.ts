import { configureStore } from "@reduxjs/toolkit";
import {  urlSlice } from "./state";
// import { Redux } from "@/interfaces/";

const store = configureStore({
    reducer: {
        url: urlSlice.reducer,
    }
});


export default store;
