import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";
import { ballotReducer } from "../slices/BallotSlice";

export const store = configureStore({
    reducer: {
        formData: formDataReducer,
        ballot: ballotReducer
    }
})