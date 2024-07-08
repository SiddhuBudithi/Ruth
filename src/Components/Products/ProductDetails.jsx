import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductDetails.css";
import ColorSelection from "../Elements/ColorSelection/ColorSelection";
import SizeSelection from "../Elements/SizeSelection/SizeSelection";
import DeliveryOptions from "../Elements/DeliveryOptions/DeliveryOptions";
import Ratings from "./Ratings";

const ProductDetails = ({ products }) => {
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [deliveryPincode, setDeliveryPincode] = useState("");

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, color: selectedColor[product.id], size: selectedSize[product.id] }]);
    console.log("Product added to cart:", product.name);
  };

  const handleToggleWishlist = (product) => {
    if (wishlist.find(w => w.id === product.id)) {
      setWishlist(wishlist.filter(w => w.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const checkDelivery = () => {
    return deliveryPincode.length === 6;
  };

  if (!products.length) {
    return <div>No products found in this category.</div>;
  }

  return (
    <div className="products-list-container">
      {products.map((product) => (
        <div key={product.id} className="product-details-container">
          <div className="product-images">
            {product.images.map((image, index) => (
              <div key={index} className="image-container">
                <img src={image} alt={product.name} />
              </div>
            ))}
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <Ratings rating={product.rating} />
            <p>Price: ${product.salePrice} (Original: ${product.originalPrice})</p>
            <ColorSelection colors={product.colors} selectedColor={selectedColor[product.id]} onSelectColor={(color) => setSelectedColor({ ...selectedColor, [product.id]: color })} />
            <SizeSelection sizes={product.sizes} selectedSize={selectedSize[product.id]} onSelectSize={(size) => setSelectedSize({ ...selectedSize, [product.id]: size })} />
            <DeliveryOptions checkDelivery={checkDelivery} />
            <button onClick={() => handleToggleWishlist(product)}>
              {wishlist.find(w => w.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <section>
              <h2>Product Details</h2>
              <p>{product.description}</p>
            </section>
            <Link to="/">Back to products</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
