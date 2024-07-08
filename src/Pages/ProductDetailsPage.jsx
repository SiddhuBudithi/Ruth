import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/Products/ProductDetails";
import Breadcrumbs from "../Components/Elements/Breadcrumbs/Breadcrumbs";
import { ProductData } from "../Static/data"; // Adjust the path to your data file

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const findProductById = (productId) => {
    for (const topCategory in ProductData.categories) {
      for (const subCategory in ProductData.categories[topCategory]) {
        const product = ProductData.categories[topCategory][subCategory].find(
          (product) => product.id === parseInt(productId)
        );
        if (product) {
          return product;
        }
      }
    }
    return null;
  };

  const product = findProductById(productId);

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: product?.category, path: `/products?category=${product?.category}` },
    { label: "Product Details", path: `/products/${productId}` },
  ];

  return (
    <div>
      <Breadcrumbs categories={breadcrumbs} />
      {product ? <ProductDetails product={product} /> : <p>Product not found</p>}
    </div>
  );
};

export default ProductDetailsPage;
