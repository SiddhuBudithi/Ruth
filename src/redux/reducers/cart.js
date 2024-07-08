import { createReducer } from "@reduxjs/toolkit";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
    cart: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
};

const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_TO_CART, (state, action) => {
            const item = action.payload;
            const isItemExist = state.cart.find((i) => i._id === item._id);
            if (isItemExist) {
                return {
                    ...state,
                    cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item],
                };
            }
        })
        .addCase(REMOVE_FROM_CART, (state, action) => {
            return {
                ...state,
                cart: state.cart.filter((i) => i._id !== action.payload),
            };
        });
});

export default cartReducer;
