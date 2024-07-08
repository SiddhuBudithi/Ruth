import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/Routes/ProductCard/ProductCard";
import Pagination from "../Components/Elements/Pagination/Pagination";
import { ProductData } from "../Static/data"; // Adjust the path to your data file
import "./Css/ProductsPage.css"; // Import the CSS file for styling

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const productsPerPage = 50; // Number of products per page

  useEffect(() => {
    let allProducts = [];
    if (categoryQuery) {
      const filteredCategories = Object.values(ProductData.categories).filter(
        category => category.name.toLowerCase() === categoryQuery.toLowerCase()
      );
      filteredCategories.forEach(category => {
        Object.values(category).forEach(subcategory => {
          allProducts = [...allProducts, ...subcategory];
        });
      });
    } else {
      Object.values(ProductData.categories).forEach(category => {
        Object.values(category).forEach(subcategory => {
          allProducts = [...allProducts, ...subcategory];
        });
      });
    }
    setProducts(allProducts);
  }, [categoryQuery]);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="products-page-container">
        <div className="products-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default ProductsPage;
