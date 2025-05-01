import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
// import { products } from "../../data/products";
import ProductCard from "../products/ProductCard";
import { getProducts } from "../../Services/ProductService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [page] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(page, 12);
      setProducts(response.items);
      // Show loader for at least 2 seconds
      setTimeout(() => {
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await getProducts(page, limit + 12);
      setProducts(response.items);
      setLimit(limit + 12);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error("Error loading more products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  // Select products with highest ratings for featured section
  const featuredProducts = [...products].sort(
    (a, b) => b.itemRating - a.itemRating
  );

  return (
    <Box sx={{ py: 6, bgcolor: "#f5f5f5" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
            Featured Products
          </Typography>

          {/* <Button
            component={Link}
            to="/products"
            endIcon={<ArrowForwardIcon />}
          >
            View All
          </Button> */}
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={20} />
              <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                Loading<span className="dot-animation">...</span>
              </Typography>
            </Box>
            <style jsx="true">{`
              .dot-animation {
                animation: dots 1.5s infinite;
              }
              @keyframes dots {
                0%,
                20% {
                  content: ".";
                }
                40% {
                  content: "..";
                }
                60%,
                100% {
                  content: "...";
                }
              }
            `}</style>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {featuredProducts.map((product) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={product.itemId}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
                sx={{
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  borderRadius: "25px",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    transition: "transform 0.3s ease",
                    boxShadow: 5,
                  },
                }}
              >
                Load More
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
