import React from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="checkout-steps-container">
      <div className="steps-wrapper">
        {/* Step 1 */}
        <div className="step-container">
          <div className={active >= 1 ? "cart_button active" : "cart_button"}>
            <span className="cart_button_text">1. Shipping</span>
          </div>
          <div className={active > 1 ? "line active-line" : "line"} />
        </div>
        
        {/* Step 2 */}
        <div className="step-container">
          <div className={active > 1 ? "cart_button active" : "cart_button"}>
            <span className={active > 1 ? "cart_button_text" : "cart_button_text inactive-text"}>
              2. Payment
            </span>
          </div>
          <div className={active > 2 ? "line active-line" : "line"} />
        </div>
        
        {/* Step 3 */}
        <div className="step-container">
          <div className={active > 2 ? "cart_button active" : "cart_button"}>
            <span className={active > 2 ? "cart_button_text" : "cart_button_text inactive-text"}>
              3. Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
