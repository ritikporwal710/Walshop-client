import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, title }) => {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          No products found
        </Typography>
      </Box>
    );
  }
  window.scrollTo(0, 0);

  return (
    <Container>
      {title && (
        <Typography
          variant="h4"
          component="h2"
          sx={{ my: 4, fontWeight: "bold" }}
        >
          {title}
        </Typography>
      )}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id} >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
