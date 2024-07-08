import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "./ProductCard.css"; // Ensure you have a CSS file for styling

const ProductCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  // Dummy functions for wishlist and cart functionality
  const handleWishlistToggle = () => setIsInWishlist(!isInWishlist);
  const handleAddToCart = () => console.log("Added to cart:", product.name);
  const handleNavigate = () => navigate(`/products/${product.id}`);

  return (
    <div className="product-card" onClick={handleNavigate}>
      <div className="product-content">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>
          <div className="product-pricing">
            {product.salePrice && (
              <span className="sale-price">${product.salePrice}</span>
            )}
            <span className="original-price">${product.originalPrice}</span>
          </div>
        </div>
      </div>
      <div className="product-actions">
        <button onClick={(e) => { e.stopPropagation(); handleWishlistToggle(); }} className="wishlist-btn">
          {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} className="cart-btn">
          <AiOutlineShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
