import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../Assests/images/logow2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ProductData } from "../../Static/data";
import {
  faShoppingCart,
  faStar,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const categories = Object.keys(ProductData.categories);

  const navigateTo = (path) => {
    setActiveMenu("");
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo(`/search?q=${searchTerm}`);
  };

  return (
    <header className="header">
      <div className="brandname" onClick={() => navigateTo("/")}>
        <img className="logopic" src={logo} alt="logo" />
      </div>

      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>

      <nav className="nav-menu">
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onMouseEnter={() => setActiveMenu(category)}
              onMouseLeave={() => setActiveMenu("")}
            >
              <button onClick={() => navigateTo(`/${category.toLowerCase()}`)}>
                {category}
              </button>
              {activeMenu === category && (
                <div className="dropdown">
                  {Object.keys(ProductData.categories[category]).map((subCategory) => (
                    <button
                      key={subCategory}
                      onClick={() =>
                        navigateTo(
                          `/${category.toLowerCase()}/${subCategory.toLowerCase()}`
                        )
                      }
                    >
                      {subCategory}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="icons">
        <div className="icon" onClick={() => navigateTo("/cart")}>
          <FontAwesomeIcon icon={faShoppingCart} /> {/* Cart Icon */}
        </div>
        <div className="icon" onClick={() => navigateTo("/wishlist")}>
          <FontAwesomeIcon icon={faStar} /> {/* Wishlist Icon */}
        </div>
        <div className="icon" onClick={() => navigateTo("/profile")}>
          <FontAwesomeIcon icon={faUser} /> {/* Profile Icon */}
        </div>
      </div>

      <div
        className="hamburger-menu"
        onClick={() => setIsNavVisible(!isNavVisible)}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      <nav className={`nav-menu ${isNavVisible ? "is-visible" : ""}`}>
        {/* Navigation Items */}
      </nav>
    </header>
  );
};

export default Header;
