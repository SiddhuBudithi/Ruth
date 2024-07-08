import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Payment.css";

const Payment = () => {
  const [orderData, setOrderData] = useState({});
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder")) || {};
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user || {},
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    try {
      const res = await axios.post(
        `${server}/order/create-order`,
        order,
        config
      );
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          const res = await axios.post(
            `${server}/order/create-order`,
            order,
            config
          );
          setOpen(false);
          navigate("/order/success");
          toast.success("Order successful!");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    try {
      const res = await axios.post(
        `${server}/order/create-order`,
        order,
        config
      );
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="payment-container">
      <PaymentInfo
        user={user}
        open={open}
        setOpen={setOpen}
        onApprove={onApprove}
        createOrder={createOrder}
        paymentHandler={paymentHandler}
        cashOnDeliveryHandler={cashOnDeliveryHandler}
      />
      <CartData orderData={orderData} />
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="payment-info-container">
      <div className="payment-method">
        <div className="method-header" onClick={() => setSelect(1)}>
          {select === 1 && <div className="method-indicator" />}
          <h4>Pay with Debit/credit card</h4>
        </div>

        {select === 1 && (
          <div className="method-content">
            <form onSubmit={paymentHandler}>
              <div className="form-group">
                <label>Name On Card</label>
                <input
                  required
                  placeholder={user && user.name}
                  value={user && user.name}
                />
              </div>
              <div className="form-group">
                <label>Exp Date</label>
                <CardExpiryElement />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <CardNumberElement />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <CardCvcElement />
              </div>
              <input type="submit" value="Submit" className="button" />
            </form>
          </div>
        )}
      </div>

      <div className="payment-method">
        <div className="method-header" onClick={() => setSelect(2)}>
          {select === 2 && <div className="method-indicator" />}
          <h4>Pay with Paypal</h4>
        </div>

        {select === 2 && (
          <div className="method-content">
            <div className="button" onClick={() => setOpen(true)}>
              Pay Now
            </div>
            {open && (
              <div className="paypal-modal">
                <div className="modal-content">
                  <div className="close-icon" onClick={() => setOpen(false)}>
                    <AiOutlineClose size={30} />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="payment-method">
        <div className="method-header" onClick={() => setSelect(3)}>
          {select === 3 && <div className="method-indicator" />}
          <h4>Cash on Delivery</h4>
        </div>

        {select === 3 && (
          <div className="method-content">
            <form onSubmit={cashOnDeliveryHandler}>
              <input type="submit" value="Confirm" className="button" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="cart-data-container">
      <div className="cart-data">
        <h3>subtotal:</h3>
        <h5>${orderData?.subTotalPrice}</h5>
      </div>
      <div className="cart-data">
        <h3>shipping:</h3>
        <h5>${shipping}</h5>
      </div>
      <div className="cart-data">
        <h3>Discount:</h3>
        <h5>
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5>${orderData?.totalPrice}</h5>
    </div>
  );
};

export default Payment;
