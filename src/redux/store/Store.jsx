import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";
import { pageNumReducer } from "../slices/PageNumSlice";
import { overviewReducer } from "../slices/OverviewSlice";

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        pageNum: pageNumReducer,
        overview: overviewReducer
    }
})