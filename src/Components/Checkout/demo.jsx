import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import "./Checkout.css";
S;
const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [email, setEmail] = useState(user?.email || "");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      !address1 ||
      !address2 ||
      !phoneNumber ||
      !email ||
      !zipCode ||
      !country ||
      !city
    ) {
      toast.error(
        "Please fill in all the required fields for delivery address!"
      );
    } else {
      const shippingAddress = {
        address1,
        address2,
        email,
        phoneNumber,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice: calculateTotalPrice(),
        subTotalPrice: calculateSubTotalPrice(),
        shipping: calculateShipping(),
        discountPrice,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const calculateSubTotalPrice = () =>
    cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

  const calculateShipping = () => calculateSubTotalPrice() * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${server}/coupon/get-coupon-value/${couponCode}`
      );
      const shopId = response.data?.couponCode?.shopId;
      const couponCodeValue = response.data?.couponCode?.value;

      if (!response.data.couponCode) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
        return;
      }

      const isCouponValid = cart.filter((item) => item.shopId === shopId);

      if (isCouponValid.length === 0) {
        toast.error("Coupon code is not valid for this shop");
        setCouponCode("");
        return;
      }

      const eligiblePrice = isCouponValid.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
      );
      const discountPrice = (eligiblePrice * couponCodeValue) / 100;
      setDiscountPrice(discountPrice);
      setCouponCodeData(response.data.couponCode);
      setCouponCode("");
    } catch (error) {
      console.error("Error while fetching coupon data:", error);
      toast.error(
        "An error occurred while applying the coupon. Please try again."
      );
    }
  };

  const calculateTotalPrice = () =>
    (calculateSubTotalPrice() + calculateShipping() - discountPrice).toFixed(2);

  return (
    <div className="checkout-container">
      <div className="checkout-grid">
        <div className="shipping-info">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="cart-data">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={calculateTotalPrice()}
            shipping={calculateShipping().toFixed(2)}
            subTotalPrice={calculateSubTotalPrice()}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPrice={discountPrice}
          />
        </div>
      </div>
      <div className="payment-button">
        <button onClick={paymentSubmit}>Go to Payment</button>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="shipping-info-container">
      <h2>Shipping Information</h2>
      <form className="shipping-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={user && user.name}
            onChange={(e) => console.log(e.target.value)}
            required
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={user && user.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {/* Country options */}
          </select>

          <label htmlFor="city">City</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {/* City options based on selected country */}
          </select>

          <label htmlFor="address1">Address 1</label>
          <input
            type="text"
            id="address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />

          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            id="address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPrice,
}) => {
  return (
    <div className="cart-data-container">
      <h2>Cart Summary</h2>
      <div className="cart-summary">
        <div>
          <p>Subtotal: ${subTotalPrice}</p>
          <p>Shipping: ${shipping}</p>
          <p>Discount: ${discountPrice}</p>
          <p>Total: ${totalPrice}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
