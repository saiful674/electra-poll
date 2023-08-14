import { configureStore } from "@reduxjs/toolkit";
import { formDataReducer } from "../slices/FormDataSlice";

export const store = configureStore([
    formDataReducer
])