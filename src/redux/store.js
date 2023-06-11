import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
    reducer:{userSlice} 
})

export default store;