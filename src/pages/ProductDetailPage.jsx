import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import ProductDetail from "../components/products/ProductDetail";
import { getAllProductByCategory } from "../Services/ProductService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const getProductByCategory = async (categoryId) => {
    const response = await getAllProductByCategory(categoryId);
    setProduct(response.items);
  };

  useEffect(() => {
    if (id) {
      getProductByCategory(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
