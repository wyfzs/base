import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reduce/themeSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    }
})