import { configureStore } from "@reduxjs/toolkit"
import Snai3yReducer from "./Slices/Snai3yReducer"
import ClientReducer from "./Slices/ClientReducer"
import userReducer from "./Slices/userReducer";

export const store = configureStore({
    reducer:
    {
        Snai3yReducer,
        ClientReducer,
        userReducer
        
    },

})