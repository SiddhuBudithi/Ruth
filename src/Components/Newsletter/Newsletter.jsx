import React, { useState } from 'react';
import './Newsletter.css'; // Make sure to create a Newsletter.css file for styling

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send 'email' to your backend to subscribe the user
    console.log('Submitted email:', email);
    // Clear the input or provide a success message
  };

  return (
    <div className="newsletter">
      <div className="newsletter-text">
        Subscribe us for get news events and offers
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="newsletter-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
