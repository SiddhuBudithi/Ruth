import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import AboutUs from "./Components/Elements/AboutUS/AboutUs";
import ContactUs from "./Components/Elements/ContactUs/ContactUs";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Components/SignUp/SignUp";
import ActivationPage from "./Pages/ActivationPage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";
import PaymentPage from "./Pages/PaymentPage"; // import ProtectedRoute from "./routes/ProtectedRoute";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  // async function getStripeApikey() {
  //   const { data } = await axios.get(`${server}/payment/stripeapikey`);
  //   setStripeApiKey(data.stripeApikey);
  // }
  useEffect(() => {
    // Store.dispatch(loadUser());
    // Store.dispatch(loadSeller());
    // Store.dispatch(getAllProducts());
    // Store.dispatch(getAllEvents());
    // getStripeApikey();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        {/* {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                  <PaymentPage />
                  </ProtectedRoute> 
                }
              />
            </Routes>
          </Elements>
        )} */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<Elements stripe={loadStripe('your_stripe_public_key')}><PaymentPage /></Elements>} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/payment" element={<PaymentPage/>} /> */}
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* <Route
          path="/products/:topCategoryId/:categoryId/:subcategoryId/:productId"
          element={<ProductDetailsPage />}
        /> */}
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/checkout"
          element={
            // <ProtectedRoute>
            <CheckoutPage />
            // {/* </ProtectedRoute> */}
          }
        />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
