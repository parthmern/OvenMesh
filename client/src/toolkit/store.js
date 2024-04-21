import { combineReducers, createReducer } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
const { default: profileSlice } = require("./slices/profileSlice");



const rootReducer = combineReducers(
    {
        profile : profileSlice ,
        cart : cartSlice ,
    }
)

export default rootReducer ;