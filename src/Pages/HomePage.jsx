import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../Static/data";
import Newsletter from "../Components/Newsletter/Newsletter";
import ProductCard from "../Components/Routes/ProductCard/ProductCard";
import "./HomePage.css"; // Make sure to create a HomePage.css file for styling

// Import components if you have them separated (e.g., ProductList, CategoryList, Carousel)
// import Carousel from './Carousel';
// import ProductList from './ProductList';
// import CategoryList from './CategoryList';

// Custom arrow components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Access product categories from ProductData
  const { clothing, electronics } = ProductData.categories;

  const featuredProducts = clothing.mens.tops; // Example of accessing products
  const bestSellers = electronics.smartphones.smartphones; // Example of accessing products

  // Divide featured products into chunks of 5
  const featuredProductChunks = [];
  for (let i = 0; i < featuredProducts.length; i += 5) {
    featuredProductChunks.push(featuredProducts.slice(i, i + 5));
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const handleBannerClick = (productId) => {
    // Save the current slide index to local storage or state management solution
    localStorage.setItem("currentSlide", currentSlide.toString());
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const savedSlide = localStorage.getItem("currentSlide");
    if (savedSlide) {
      setCurrentSlide(parseInt(savedSlide, 10));
    }
  }, []);

  return (
    <div className="home-page">
      {/* Featured Products Carousel */}
      <section className="featured-products-carousel">
        <Slider {...settings} nextArrow={<SampleNextArrow />} prevArrow={<SamplePrevArrow />}>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="featured-product-banner"
              onClick={() => handleBannerClick(product.id)}
            >
              <img src={product.bannerImage} alt={product.name} />
              <p className="carousel-caption">{product.name}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-item">
            <Link to="/category/clothes">Clothes</Link>
          </div>
          <div className="category-item">
            <Link to="/category/electronics">Electronics</Link>
          </div>
          {/* Add more categories as needed */}
        </div>
      </section>
      {/* Best Sellers Section */}
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <div className="best-sellers-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* Promotions or Discounts Section */}
      <section className="promotions">
        <h2>Current Promotions</h2>
        <div className="promotion-items">
          {/* Example Promotion Items */}
          <div className="promotion-item">
            <h3>Summer Sale</h3>
            <p>Up to 50% off on summer clothing!</p>
            <Link to="/category/summer">Shop Now</Link>
          </div>
          <div className="promotion-item">
            <h3>Electronics Fest</h3>
            <p>Exciting offers on latest electronics!</p>
            <Link to="/category/electronics">Discover More</Link>
          </div>
          {/* Add more promotion items as needed */}
        </div>
      </section>
      {/* Newsletter Signup */}
      <div>
        <Newsletter />
      </div>
    </div>
  );
};

export default HomePage;
