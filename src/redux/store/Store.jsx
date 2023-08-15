import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";
import { pageNumReducer } from "../slices/PageNumSlice";

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        pageNum: pageNumReducer
    }
})