import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import ProductGrid from "../components/products/ProductGrid";
import { getAllProductByCategory } from "../Services/ProductService";
import { useSearch } from "../context/SearchContext";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const { searchQuery } = useSearch();




  const getProductByCategory = async (categoryId) => {
    const response = await getAllProductByCategory(categoryId, searchQuery);
    setProducts(response.items);
  };

  useEffect(() => {
    if (categoryId) {
      // Get products by category
      getProductByCategory(categoryId);

      window.scrollTo(0, 0);
    }
  }, [categoryId, searchQuery]);

  // Format category name for display
  const formatCategoryName = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">
            {formatCategoryName(categoryId)}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        {formatCategoryName(categoryId)}
      </Typography>

      <ProductGrid
        products={products}
        // title={
        //   products.length > 0
        //     ? `${products.length} Products Found`
        //     : "No Products Found"
        // }
      />
    </Container>
  );
};

export default CategoryPage;
