import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import './Cart.css'; 

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); // Accessing cart items from Redux store
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateCart = (id, qty) => {
    const item = cart.find((item) => item._id === id);
    dispatch(addTocart({ ...item, qty }));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <IoBagHandleOutline className="cart-icon" />
        <h2>Shopping Cart</h2>
        <RxCross1 className="close-icon" onClick={() => setOpenCart(false)} />
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <Link to="/shop">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <div className="quantity-controls">
                  <HiOutlineMinus onClick={() => handleUpdateCart(item._id, item.qty - 1 <= 0 ? 1 : item.qty - 1)} />
                  <span className="quantity">{item.qty}</span>
                  <HiPlus onClick={() => handleUpdateCart(item._id, item.qty + 1)} />
                </div>
                <span className="item-price">${item.price}</span>
              </div>
              <RxCross1 className="remove-item" onClick={() => handleRemoveFromCart(item._id)} />
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div className="total-price">
          <span>Total:</span>
          <span className="amount">${totalPrice}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
