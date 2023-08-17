import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";
import { pageNumReducer } from "../slices/PageNumSlice";
import { overviewReducer } from "../slices/OverviewSlice";
import { ballotReducer } from "../slices/BallotSlice";

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        pageNum: pageNumReducer,
        overview: overviewReducer,
        ballot: ballotReducer
    }
})