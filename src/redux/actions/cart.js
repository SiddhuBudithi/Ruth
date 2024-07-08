// Define action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Action creator to add item to cart
export const addTocart = (data) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: data,
    });
   
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
};

// Action creator to remove item from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: data._id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
};
