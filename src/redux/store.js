import { configureStore } from "@reduxjs/toolkit";
import CartReducer  from "./Slices/CartSlice";
import ProductReducer from "./Slices/ProductSlice"

export const store = configureStore({
    reducer:{
        cart: CartReducer,
        products:ProductReducer,
    }
});