import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";
import { overviewReducer } from "../slices/OverviewSlice";
import { ballotReducer } from "../slices/BallotSlice";

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        overview: overviewReducer,
        ballot: ballotReducer
    }
})