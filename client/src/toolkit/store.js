import { combineReducers, createReducer } from "@reduxjs/toolkit";
const { default: profileSlice } = require("./slices/profileSlice");



const rootReducer = combineReducers(
    {
        profile : profileSlice ,
    }
)

export default rootReducer ;