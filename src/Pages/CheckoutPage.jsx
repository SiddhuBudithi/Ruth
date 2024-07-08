import React from 'react'
import CheckoutSteps from "../Components/Checkout/CheckoutSteps";
import Checkout from "../Components/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
    
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />

    </div>
  )
}

export default CheckoutPage