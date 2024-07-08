import React from 'react'
import CheckoutSteps from '../Components/Checkout/CheckoutSteps'
import Payment from "../Components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className=''>
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
    </div>
  )
}

export default PaymentPage