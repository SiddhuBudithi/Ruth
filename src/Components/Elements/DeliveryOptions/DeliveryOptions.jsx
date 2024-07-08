import React, { useState } from "react";
import "./DeliveryOptions.css"; // Import CSS file for styles

const DeliveryOptions = ({ checkDelivery }) => {
  const [pincode, setPincode] = useState("");
  const [isDeliverable, setIsDeliverable] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [error, setError] = useState("");

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
    setError(""); // Clear error message when pincode changes
  };

  const handleCheckDelivery = () => {
    // Check if pincode is valid (only numeric and length 6)
    if (/^\d{6}$/.test(pincode)) {
      const deliverable = checkDelivery(pincode);
      setIsDeliverable(deliverable);
      if (deliverable) {
        setDeliveryOptions(["Standard Delivery", "Express Delivery"]);
      } else {
        setDeliveryOptions([]);
        setError("Delivery not available for this location.");
      }
    } else {
      setError("Please enter a valid pincode (6 digits).");
    }
  };

  return (
    <div className="delivery-options-container">
      <h3>Delivery Options</h3>
      <div className="delivery-input">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button onClick={handleCheckDelivery}>Check Delivery</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {isDeliverable ? (
        <ul className="delivery-options-list">
          {deliveryOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      ) : (
        !error && <p>No delivery options available.</p>
      )}
    </div>
  );
};

export default DeliveryOptions;
